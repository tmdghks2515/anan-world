package io.ananworld.postservice.domain.post.repository;

import io.ananworld.postservice.global.domain.entity.PostVisit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PostVisitRepository extends JpaRepository<PostVisit, Long> {
    Optional<PostVisit> findTop1ByPostPostIdAndUserIdOrderByCreatedAtDesc(Long postId, Long userId);
}
