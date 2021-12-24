package io.ananworld.postservice.domain.post.repository;

import io.ananworld.postservice.global.domain.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}
