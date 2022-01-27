package io.ananworld.postservice.domain.post.repository;

import io.ananworld.postservice.global.domain.entity.PostLike;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PostLikeRepository extends JpaRepository<PostLike, Long> {
    Optional<List<PostLike>> findByPostPostIdAndUserId(Long postId, Long userId);
}
