package io.ananworld.postservice.domain.post.service;

import io.ananworld.postservice.global.domain.dto.PostDto;
import io.ananworld.postservice.global.exception.ApiException;

public interface PostService {
    void save(PostDto dto) throws ApiException;
}
