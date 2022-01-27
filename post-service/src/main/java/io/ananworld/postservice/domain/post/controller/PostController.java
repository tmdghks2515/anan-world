package io.ananworld.postservice.domain.post.controller;

import io.ananworld.postservice.domain.post.service.PostService;
import io.ananworld.postservice.global.domain.dto.CommentDto;
import io.ananworld.postservice.global.domain.dto.PostDto;
import io.ananworld.postservice.global.exception.ApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @PostMapping("/write")
    public ResponseEntity<Void> write(@RequestBody PostDto dto) throws ApiException {
        postService.save(dto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/open/list")
    public ResponseEntity<List<PostDto>> list() {
        List<PostDto> list = postService.list();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/open/read")
    public ResponseEntity<PostDto> read(@RequestParam Long postId, @RequestParam(required = false) Long userId) throws ApiException {
        PostDto dto = postService.read(postId, userId);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @PostMapping("/postLike")
    public ResponseEntity<PostDto> postLike(@RequestBody Map<String, Long> data) throws ApiException {
        Long postId = data.get("postId");
        Long userId = data.get("userId");
        postService.postLike(postId, userId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/postLikeCancel")
    public ResponseEntity<PostDto> postLikeCancel(@RequestBody Map<String, Long> data) throws ApiException {
        Long postId = data.get("postId");
        Long userId = data.get("userId");
        postService.postLikeCancel(postId, userId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
