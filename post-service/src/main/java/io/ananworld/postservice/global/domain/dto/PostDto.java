package io.ananworld.postservice.global.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
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
    private List<CommentDto> comments;
    private Integer commentsCnt;
    private String createdAt;
    private String modifiedAt;

}
