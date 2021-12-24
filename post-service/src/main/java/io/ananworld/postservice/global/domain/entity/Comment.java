package io.ananworld.postservice.global.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@ToString
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Entity
public class Comment {

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
}
