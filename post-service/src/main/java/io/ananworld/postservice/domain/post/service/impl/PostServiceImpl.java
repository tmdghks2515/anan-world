package io.ananworld.postservice.domain.post.service.impl;

import io.ananworld.postservice.domain.post.repository.PostRepository;
import io.ananworld.postservice.domain.post.repository.TagRepository;
import io.ananworld.postservice.domain.post.service.PostService;
import io.ananworld.postservice.global.domain.dto.PostDto;
import io.ananworld.postservice.global.domain.dto.TagDto;
import io.ananworld.postservice.global.domain.entity.Post;
import io.ananworld.postservice.global.domain.entity.Tag;
import io.ananworld.postservice.global.exception.ApiException;
import lombok.RequiredArgsConstructor;
import net.bytebuddy.implementation.bytecode.Throw;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.Set;

@Service
@Transactional
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final Logger log = LoggerFactory.getLogger(PostServiceImpl.class);
    private final PostRepository postRepository;
    private final TagRepository tagRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void save(PostDto dto) throws ApiException {
        log.info("save post - {}", dto);

        if(dto.getPostTitle().length() == 0 || dto.getPostContent().length() == 0)
            throw new ApiException(HttpStatus.BAD_REQUEST, "포스트의 제목/내용이 작성되지 않았습니다. ");

        Set<TagDto> tagDtos = dto.getTags();
        Set<Tag> tags = new HashSet<>();
        if(!tagDtos.isEmpty())
            tags = tagDtoSetToEntitySet(tagDtos);
        Post post = new Post(dto, tags);

        postRepository.save(post);
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
}
