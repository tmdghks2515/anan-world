package io.ananworld.postservice.global.domain.dto;

import io.ananworld.postservice.global.domain.entity.Tag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
public class PostDto {
    private Long postId;
    private String postTitle;
    private String postContent;
    private String writerName;
    private Set<TagDto> tags;
    private String createdAt;
    private String modifiedAt;

    public PostDto(Long postId, String postTitle, String postContent, String writerName, Set<Tag> tags, String createdAt, String modifiedAt) {
        this.postId = postId;
        this.postTitle = postTitle;
        this.postContent = postContent;
        this.writerName = writerName;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
        this.tags = TagsEntityToDto(tags);

    }

    private Set<TagDto> TagsEntityToDto(Set<Tag> tags) {
        Set<TagDto> dtos = new HashSet<>();
        tags.forEach(tag -> {
            dtos.add(tag.toDto());
        });

        return dtos;
    }
}
