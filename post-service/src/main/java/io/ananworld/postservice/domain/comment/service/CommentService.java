package io.ananworld.postservice.domain.comment.service;

import io.ananworld.postservice.global.domain.dto.CommentDto;
import io.ananworld.postservice.global.exception.ApiException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CommentService {
    void comment(CommentDto dto) throws ApiException;

    List<CommentDto> comments(Long postId, Pageable pageable);
}
