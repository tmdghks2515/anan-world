package io.ananworld.postservice.domain.post.repository.custom.impl;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import io.ananworld.postservice.domain.post.repository.custom.PostRepositoryCustom;
import io.ananworld.postservice.global.domain.dto.PostDto;
import io.ananworld.postservice.global.domain.entity.QPost;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static io.ananworld.postservice.global.domain.entity.QPost.post;

@Repository
@RequiredArgsConstructor
public class PostRepositoryImpl implements PostRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<PostDto> list() {
        return queryFactory.select(
                Projections.fields(PostDto.class,
                        post.postId,
                        post.postTitle,
                        post.postContent,
                        post.createdAt
                        )
                )
                .from(post)
                .fetch();
    }
}
