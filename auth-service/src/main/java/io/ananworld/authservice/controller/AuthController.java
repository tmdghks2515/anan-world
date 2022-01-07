package io.ananworld.authservice.controller;

import io.ananworld.authservice.domain.dto.AuthRequestDto;
import io.ananworld.authservice.domain.dto.AuthResponseDto;
import io.ananworld.authservice.domain.dto.UserDto;
import io.ananworld.authservice.domain.dto.UserEventDto;
import io.ananworld.authservice.domain.entity.User;
import io.ananworld.authservice.jwt.JwtUserDetailService;
import io.ananworld.authservice.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class AuthController {
    private final JwtUserDetailService userDetailService;
    private final UserService userService;

    @PostMapping("/login")
    public AuthResponseDto login(AuthRequestDto request) throws Exception {
        return userDetailService.createJwtToken(request);
    }

    @PostMapping("/register")
    public User registerNewUser(@RequestBody UserDto userDto) {

        User newUser = userService.createNewUser(userDto);
        return newUser;
    }
}

