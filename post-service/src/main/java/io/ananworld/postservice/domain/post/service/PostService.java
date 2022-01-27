package io.ananworld.postservice.domain.post.service;

import io.ananworld.postservice.global.domain.dto.PostDto;
import io.ananworld.postservice.global.exception.ApiException;

import java.util.List;

public interface PostService {
    void save(PostDto dto) throws ApiException;

    List<PostDto> list();

    PostDto read(Long postId, Long userId) throws ApiException;

    void postLike(Long postId, Long userId) throws ApiException;

    void postLikeCancel(Long postId, Long userId) throws ApiException;
}
