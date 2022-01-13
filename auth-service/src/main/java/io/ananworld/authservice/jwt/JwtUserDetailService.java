package io.ananworld.authservice.jwt;

import io.ananworld.authservice.domain.dto.AuthRequestDto;
import io.ananworld.authservice.domain.dto.AuthResponseDto;
import io.ananworld.authservice.domain.dto.UserDto;
import io.ananworld.authservice.domain.entity.User;
import io.ananworld.authservice.exceptions.ApiException;
import io.ananworld.authservice.repository.UserRepository;
import io.ananworld.authservice.utils.CookieUtils;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Component
@Transactional
public class JwtUserDetailService implements UserDetailsService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final JwtUserDetailService userDetailService;

    public JwtUserDetailService(UserRepository userRepository, JwtUtil jwtUtil, @Lazy AuthenticationManager authenticationManager, @Lazy JwtUserDetailService userDetailService) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
        this.userDetailService = userDetailService;
    }

    public AuthResponseDto createJwtToken(AuthRequestDto jwtRequest, HttpServletRequest req, HttpServletResponse res) throws Exception{
        String userName = jwtRequest.getUsername();
        String userPassword = jwtRequest.getPassword();
        authenticate(userName, userPassword);
        final UserDetails userDetails = loadUserByUsername(userName);
        String accessToken = jwtUtil.generate(userDetails, "ACCESS");
        String refreshToken = jwtUtil.generate(userDetails, "REFRESH");
        CookieUtils.create(res, "refreshToken", refreshToken, true, false, 2592000, "localhost"); // maxAge 30일

        return new AuthResponseDto(accessToken, createUserDto(userName));
    }

    public AuthResponseDto refreshJwtToken(HttpServletRequest req, HttpServletResponse res) throws Exception {
        String refreshToken = "";
        Cookie cookie = WebUtils.getCookie(req, "refreshToken");
        if(cookie != null)
            refreshToken = cookie.getValue();
        String username = jwtUtil.getUserNameFromToken(refreshToken);
        UserDetails userDetails = userDetailService.loadUserByUsername(username);
        if(!jwtUtil.validateToken(refreshToken, userDetails))
            throw new ApiException("401", "refreshToken is invalid");
        String accessToken = jwtUtil.generate(userDetails, "ACCESS");
        String refreshTokenNew = jwtUtil.generate(userDetails, "REFRESH");
        CookieUtils.create(res, "refreshToken", refreshTokenNew, true, false, 2592000, "localhost"); // maxAge 30일
        return new AuthResponseDto(accessToken, createUserDto(username));
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username).get();
        if (user != null) {
            return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), getAuthorities(user));
        } else {
            throw new UsernameNotFoundException("Username is not valid");
        }
    }

    private Set<SimpleGrantedAuthority> getAuthorities(User user) {
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        user.getRoles().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority("ROLE_"+role.getRoleName()));
        });
        return authorities;
    }

    private void authenticate(String userName, String userPassword) throws Exception{
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userName, userPassword));
        } catch (DisabledException e) {
            throw new Exception("User is disabled");
        } catch(BadCredentialsException e) {
            throw new Exception("Bad credentials from user");
        }
    }

    private UserDto createUserDto(String userName) {
        User user = userRepository.findByUsername(userName).get();
        return UserDto.builder()
                .username(user.getUsername())
                .name(user.getName())
                .email(user.getEmail())
                .roles(user.getRoles())
                .build();
    }
}