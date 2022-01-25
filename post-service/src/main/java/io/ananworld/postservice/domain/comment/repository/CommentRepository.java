package io.ananworld.postservice.domain.comment.repository;

import io.ananworld.postservice.global.domain.dto.CommentDto;
import io.ananworld.postservice.global.domain.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPostPostId(Long postId, Pageable pageable);
}
