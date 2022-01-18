package io.ananworld.postservice.domain.post.controller;

import io.ananworld.postservice.domain.post.service.PostService;
import io.ananworld.postservice.global.domain.dto.PostDto;
import io.ananworld.postservice.global.exception.ApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @GetMapping("/info")
    public String test() {
        return "성공";
    }

    @PostMapping("/write")
    public ResponseEntity<Void> write(@RequestBody PostDto dto) throws ApiException {
        postService.save(dto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
