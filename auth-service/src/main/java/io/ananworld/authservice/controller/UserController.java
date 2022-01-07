package io.ananworld.authservice.controller;

import io.ananworld.authservice.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostConstruct
    public void init() {
        userService.init();
    }

}

