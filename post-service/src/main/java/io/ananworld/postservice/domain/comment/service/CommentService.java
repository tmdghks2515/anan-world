package io.ananworld.postservice.domain.comment.service;

import io.ananworld.postservice.global.domain.dto.CommentDto;
import io.ananworld.postservice.global.exception.ApiException;

public interface CommentService {
    void comment(CommentDto dto) throws ApiException;
}
