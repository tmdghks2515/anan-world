package io.ananworld.postservice.domain.post.service;

import io.ananworld.postservice.global.domain.dto.CommentDto;
import io.ananworld.postservice.global.domain.dto.PostDto;
import io.ananworld.postservice.global.exception.ApiException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PostService {
    void save(PostDto dto) throws ApiException;

    List<PostDto> list();

    PostDto read(Long postId) throws ApiException;
}
