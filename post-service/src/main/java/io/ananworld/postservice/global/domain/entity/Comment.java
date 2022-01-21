package io.ananworld.postservice.global.domain.entity;

import io.ananworld.postservice.global.domain.dto.CommentDto;
import lombok.*;

import javax.persistence.*;

@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Entity
public class Comment extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="comment_id")
    private Long commentId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="post_id")
    private Post post;

    @Column(name="writer_id")
    private Long writerId;

    @Column(name="comment_content", columnDefinition = "TEXT")
    private String commentContent;

    public CommentDto toDto() {
        return CommentDto.builder()
                .commentContent(this.commentContent)
                .commentId(this.commentId)
                .postDto(this.post.toDto())
                .writerId(this.writerId)
                .build();
    }
}
