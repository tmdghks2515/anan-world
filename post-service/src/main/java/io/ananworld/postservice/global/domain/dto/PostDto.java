package io.ananworld.postservice.global.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostDto {
    private Long postId;
    private String postTitle;
    private String postContent;
    private Long writerId;
    private Set<TagDto> tags;
}
