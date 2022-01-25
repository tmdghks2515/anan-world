package io.ananworld.postservice.domain.comment.controller;

import io.ananworld.postservice.domain.comment.service.CommentService;
import io.ananworld.postservice.global.domain.dto.CommentDto;
import io.ananworld.postservice.global.exception.ApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/comment")
    public ResponseEntity<Void> comment(@RequestBody CommentDto dto) throws ApiException {
        commentService.comment(dto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/open/comments")
    public ResponseEntity<List<CommentDto>> comments(@RequestParam Long postId, Pageable pageable) {
        if (pageable.getSort().isUnsorted())
            pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.Direction.DESC, "createdAt");
        List<CommentDto> dtos = commentService.comments(postId, pageable);
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

}
