package io.ananworld.postservice.global.domain.entity;

import io.ananworld.postservice.global.domain.dto.PostDto;
import io.ananworld.postservice.global.domain.dto.TagDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@ToString
@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Post extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "post_id")
    private Long postId;

    @Column(name="writer_name")
    private String writerName;

    @Column(name="post_title", length = 60)
    private String postTitle;

    @Column(columnDefinition = "TEXT", name="post_content")
    private String postContent;

    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.ALL})
    @JoinTable(name="post_tag",
            joinColumns = @JoinColumn(name="post_id"),
            inverseJoinColumns = @JoinColumn(name="tag_name")
    )
    private Set<Tag> tags;

    public Post(PostDto dto, Set<Tag> tags) {
        this.writerName = dto.getWriterName();
        this.postTitle = dto.getPostTitle();
        this.postContent = dto.getPostContent();
        this.tags = tags;
    }

    public PostDto toDto() {
        PostDto dto = PostDto.builder()
                .postId(this.postId)
                .postTitle(this.postTitle)
                .postContent(this.postContent)
                .writerName(this.writerName)
                .build();
        Set<TagDto> tagsDto = new HashSet<>();
        tags.forEach(tag -> tagsDto.add(tag.toDto()));
        dto.setTags(tagsDto);
        return dto;
    }
}
