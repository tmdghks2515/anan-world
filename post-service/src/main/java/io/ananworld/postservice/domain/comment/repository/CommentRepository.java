package io.ananworld.postservice.domain.comment.repository;

import io.ananworld.postservice.global.domain.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
