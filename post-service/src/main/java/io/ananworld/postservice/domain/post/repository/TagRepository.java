package io.ananworld.postservice.domain.post.repository;

import io.ananworld.postservice.global.domain.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, String> {
}
