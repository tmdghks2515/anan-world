package io.ananworld.postservice.domain.post.repository;

import io.ananworld.postservice.global.domain.entity.Comment;
import io.ananworld.postservice.global.domain.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {

    @EntityGraph(attributePaths = {"comments"}, type = EntityGraph.EntityGraphType.LOAD)
    Optional<Post> findWithCommentsByPostId(Long postId);

    @EntityGraph(attributePaths = {"tags"}, type = EntityGraph.EntityGraphType.LOAD)
    Optional<Post> findWithTagsByPostId(Long postId);
}
