package io.ananworld.postservice.global.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class PostDto {
    private Long postId;
    private String postTitle;
    private String postContent;
    private String writerName;
    private Set<TagDto> tags;
    private Set<CommentDto> comments;
    private String createdAt;
    private String modifiedAt;

}
