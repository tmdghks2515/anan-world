package io.ananworld.postservice.global.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name="post_visit")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@ToString
public class PostVisit extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="post_visit_id")
    private Long postVisitId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="post_id")
    private Post post;

    @Column(name="user_id")
    private Long userId;
}
