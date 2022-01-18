package io.ananworld.authservice.controller;

import io.ananworld.authservice.domain.dto.AuthRequestDto;
import io.ananworld.authservice.domain.dto.AuthResponseDto;
import io.ananworld.authservice.domain.dto.UserDto;
import io.ananworld.authservice.domain.dto.UserEventDto;
import io.ananworld.authservice.domain.entity.User;
import io.ananworld.authservice.exceptions.ApiException;
import io.ananworld.authservice.jwt.JwtUserDetailService;
import io.ananworld.authservice.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequiredArgsConstructor
public class AuthController {
    private final JwtUserDetailService userDetailService;
    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody AuthRequestDto request, HttpServletRequest req, HttpServletResponse res) throws Exception {
        AuthResponseDto dto = userDetailService.createJwtToken(request, req, res);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<Void> registerNewUser(@RequestBody UserDto userDto) throws ApiException {
        userService.createNewUser(userDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/refreshJwt")
    public AuthResponseDto refreshJwt(HttpServletRequest req, HttpServletResponse res) throws Exception {
        return userDetailService.refreshJwtToken(req, res);
    }
}

