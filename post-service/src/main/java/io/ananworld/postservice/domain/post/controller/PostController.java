package io.ananworld.postservice.domain.post.controller;

import io.ananworld.postservice.global.domain.dto.PostDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class PostController {

    @GetMapping("/info")
    public String test() {
        return "성공";
    }

    @PostMapping("/write")
    public ResponseEntity<Void> write(@RequestBody PostDto dto) {

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
