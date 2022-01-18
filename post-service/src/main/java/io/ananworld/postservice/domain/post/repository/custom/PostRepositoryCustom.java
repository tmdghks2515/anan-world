package io.ananworld.postservice.domain.post.repository.custom;

import io.ananworld.postservice.global.domain.dto.PostDto;

import java.util.List;

public interface PostRepositoryCustom {
    List<PostDto> list();
}
