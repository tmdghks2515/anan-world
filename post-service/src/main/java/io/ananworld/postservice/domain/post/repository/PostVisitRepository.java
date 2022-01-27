package io.ananworld.postservice.domain.post.repository;

import io.ananworld.postservice.global.domain.entity.PostVisit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostVisitRepository extends JpaRepository<PostVisit, Long> {
}
