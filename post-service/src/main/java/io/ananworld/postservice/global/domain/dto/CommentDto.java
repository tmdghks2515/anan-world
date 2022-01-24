package io.ananworld.postservice.global.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class CommentDto {
    private Long commentId;
    private Long postId;
    private Long writerId;
    private String commentContent;
    private String createdAt;
    private String modifiedAt;
}
