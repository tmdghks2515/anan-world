package io.ananworld.postservice.global.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@ToString
@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "post_id")
    private Long postId;

    @Column(name="writer_id")
    private Long writerId;

    @Column(name="post_title", length = 60)
    private String postTitle;

    @Column(columnDefinition = "TEXT", name="post_content")
    private String postContent;

}
