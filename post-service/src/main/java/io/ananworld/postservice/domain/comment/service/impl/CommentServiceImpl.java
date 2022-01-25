package io.ananworld.postservice.domain.comment.service.impl;

import io.ananworld.postservice.domain.comment.repository.CommentRepository;
import io.ananworld.postservice.domain.comment.service.CommentService;
import io.ananworld.postservice.domain.post.repository.PostRepository;
import io.ananworld.postservice.global.domain.dto.CommentDto;
import io.ananworld.postservice.global.domain.entity.Comment;
import io.ananworld.postservice.global.domain.entity.Post;
import io.ananworld.postservice.global.exception.ApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;

    @Override
    public void comment(CommentDto dto) throws ApiException {
        Post post = postRepository.findById(dto.getPostId()).orElseThrow(() -> new ApiException("해당 포스트는 존재하지 않습니다."));
        Comment comment = Comment.builder()
                .commentContent(dto.getCommentContent())
                .post(post)
                .writerId(dto.getWriterId())
                .build();

        commentRepository.save(comment);
    }

    @Override
    public List<CommentDto> comments(Long postId, Pageable pageable) {
        List<Comment> comments = commentRepository.findByPostPostId(postId, pageable);
        List<CommentDto> dtos = new ArrayList<>();
        comments.forEach(comment -> {
            dtos.add(comment.toDto());
        });
        return dtos;
    }
}
