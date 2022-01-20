package io.ananworld.postservice.domain.post.controller;

import io.ananworld.postservice.domain.post.service.PostService;
import io.ananworld.postservice.global.domain.dto.PostDto;
import io.ananworld.postservice.global.exception.ApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @PostMapping("/write")
    public ResponseEntity<Void> write(@RequestBody PostDto dto) throws ApiException {
        postService.save(dto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<List<PostDto>> list() {
        List<PostDto> list = postService.list();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/read")
    public ResponseEntity<PostDto> read(@RequestParam Long postId) throws ApiException {
        PostDto dto = postService.read(postId);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

}
