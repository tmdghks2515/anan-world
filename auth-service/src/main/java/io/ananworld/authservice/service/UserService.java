package io.ananworld.authservice.service;

import io.ananworld.authservice.domain.dto.RoleDto;
import io.ananworld.authservice.domain.dto.UserDto;
import io.ananworld.authservice.domain.entity.Role;
import io.ananworld.authservice.domain.entity.User;
import io.ananworld.authservice.exceptions.ApiException;
import io.ananworld.authservice.repository.RoleRepository;
import io.ananworld.authservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    public void init() {
        RoleDto roleDto = RoleDto.builder()
                .roleName("USER")
                .roleDescription("일반 유저")
                .build();

        Role role = new Role(roleDto);

        roleRepository.save(role);
    }

    public User createNewUser(UserDto dto) throws ApiException{

        if (userRepository.findByUsername(dto.getUsername()).isPresent()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "사용중인 아이디 입니다.");
        } else if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "사용중인 이메일 입니다.");
        }

        User user = new User(dto);
        Role role = roleRepository.findById("USER").get();
        Set<Role> roles = new HashSet<>();
        roles.add(role);
        user.setRoleAndPW(roles, getEncodedPassword(dto.getPassword()));

        return userRepository.save(user);
    }


    private String getEncodedPassword(String password) {
        return passwordEncoder.encode(password);
    }

    public List<UserDto> list() {
        return userRepository.list();
    }
}
