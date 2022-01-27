package io.ananworld.postservice.domain.post.service.impl;

import com.querydsl.core.util.StringUtils;
import io.ananworld.postservice.domain.post.repository.PostLikeRepository;
import io.ananworld.postservice.domain.post.repository.PostRepository;
import io.ananworld.postservice.domain.post.repository.PostVisitRepository;
import io.ananworld.postservice.domain.post.repository.TagRepository;
import io.ananworld.postservice.domain.post.repository.custom.PostRepositoryCustom;
import io.ananworld.postservice.domain.post.service.PostService;
import io.ananworld.postservice.global.domain.dto.PostDto;
import io.ananworld.postservice.global.domain.dto.TagDto;
import io.ananworld.postservice.global.domain.entity.Post;
import io.ananworld.postservice.global.domain.entity.PostLike;
import io.ananworld.postservice.global.domain.entity.Tag;
import io.ananworld.postservice.global.exception.ApiException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@Transactional
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final Logger log = LoggerFactory.getLogger(PostServiceImpl.class);
    private final PostRepository postRepository;
    private final TagRepository tagRepository;
    private final PostRepositoryCustom postRepositoryCustom;
    private final PostLikeRepository postLikeRepository;
    private final PostVisitRepository postVisitRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void save(PostDto dto) throws ApiException {
        log.info("save post - {}", dto);

        if(StringUtils.isNullOrEmpty(dto.getPostTitle()) || StringUtils.isNullOrEmpty(dto.getPostContent()))
            throw new ApiException("포스트의 제목/내용이 작성되지 않았습니다. ");

        Set<TagDto> tagDtos = dto.getTags();
        Set<Tag> tags = new HashSet<>();
        if(!tagDtos.isEmpty())
            tags = tagDtoSetToEntitySet(tagDtos);
        Post post = new Post(dto, tags);

        postRepository.save(post);
    }

    @Override
    public List<PostDto> list() {
        return postRepositoryCustom.list();
    }

    @Override
    public PostDto read(Long postId, Long userId) throws ApiException {
        Post post = postRepository.findWithTagsByPostId(postId).orElseThrow(() -> new ApiException("no such post with postId: " + postId));
        PostDto dto = post.toDto();

        dto.setTags(tagsToTagDtos(post.getTags()));
        dto.setPostLikeYn(findPostLikeYn(postId, userId));
        return dto;
    }

    @Override
    public void postLike(Long postId, Long userId) throws ApiException {
        Post post = postRepository.findById(postId).orElseThrow(() -> new ApiException("no sush post with postId: " + postId));
        PostLike postLike = new PostLike(post, userId);
        postLikeRepository.save(postLike);
    }

    @Override
    public void postLikeCancel(Long postId, Long userId) throws ApiException {
        List<PostLike> postLikeList = postLikeRepository.findByPostPostIdAndUserId(postId, userId).orElseThrow(() -> new ApiException("findByPostIdAndUserId error"));
        postLikeRepository.deleteAll(postLikeList);
    }

    public Set<Tag> tagDtoSetToEntitySet(Set<TagDto> tagDtos) {
        Set<Tag> tags = new HashSet<>();
        tagDtos.forEach(tagDto -> {
            String tagName = tagDto.getTagName();
            if (!tagRepository.findById(tagName).isPresent())
                tagRepository.save(new Tag(tagName));
            tags.add(tagRepository.findById(tagName).get());
        });
        return tags;
    }

    public Set<TagDto> tagsToTagDtos(Collection<Tag> tags) {
        Set<TagDto> dtos = new HashSet<>();
        tags.forEach(tag -> {
            dtos.add(tag.toDto());
        });
        return dtos;
    }

    public Boolean findPostLikeYn(Long postId, Long userId) throws ApiException {
        if(userId == null)
            return false;
        List<PostLike> postLikeList = postLikeRepository.findByPostPostIdAndUserId(postId, userId).orElseThrow(() -> new ApiException("findByPostIdAndUserId error"));
        return !postLikeList.isEmpty();
    }
}
