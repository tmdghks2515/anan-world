package io.ananworld.postservice.domain.comment.controller;

import io.ananworld.postservice.domain.comment.service.CommentService;
import io.ananworld.postservice.global.domain.dto.CommentDto;
import io.ananworld.postservice.global.exception.ApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/comment")
    public ResponseEntity<Void> comment(@RequestParam CommentDto dto) throws ApiException {
        commentService.comment(dto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
