package io.ananworld.postservice.global.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name="post_like")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@ToString
public class PostLike extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="post_like_id")
    private Long postLikeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="post_id")
    private Post post;

    @Column(name="user_id")
    private Long userId;

    public PostLike(Post post, Long userId) {
        this.post = post;
        this.userId = userId;
    }
}
