package io.ananworld.postservice.global.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class CommentDto {
    private Long commentId;
    private PostDto postDto;
    private Long writerId;
    private String commentContent;
}
