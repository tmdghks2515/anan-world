package io.ananworld.postservice.global.domain.entity;

import io.ananworld.postservice.global.domain.dto.CommentDto;
import io.ananworld.postservice.global.domain.dto.PostDto;
import io.ananworld.postservice.global.domain.dto.TagDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import java.util.*;

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

    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    @JoinTable(name="post_tag",
            joinColumns = @JoinColumn(name="post_id"),
            inverseJoinColumns = @JoinColumn(name="tag_name")
    )
    private Collection<Tag> tags = new HashSet<>();

    @OneToMany(mappedBy = "post", fetch = FetchType.LAZY, cascade = { CascadeType.ALL })
    @OrderBy("createdAt desc")
    private Collection<Comment> comments = new ArrayList<>();

    @Formula("(select count(*) from comment c where c.post_id = post_id)")
    private Integer commentsCnt;

    @Formula("(select count(*) from post_like pl where pl.post_id = post_id)")
    private Integer postLikeCnt;

    @Formula("(select count(*) from post_visit pv where pv.post_id = post_id)")
    private Integer postVisitCnt;

    public Post(PostDto dto, Set<Tag> tags) {
        this.writerName = dto.getWriterName();
        this.postTitle = dto.getPostTitle();
        this.postContent = dto.getPostContent();
        this.tags = tags;
    }

    public PostDto toDto() {
        return PostDto.builder()
                .postId(this.postId)
                .postTitle(this.postTitle)
                .postContent(this.postContent)
                .writerName(this.writerName)
                .createdAt(this.getCreatedAt())
                .modifiedAt(this.getModifiedAt())
                .commentsCnt(this.commentsCnt)
                .postLikeCnt(this.postLikeCnt)
                .postVisitCnt(this.postVisitCnt)
                .build();
    }
}
