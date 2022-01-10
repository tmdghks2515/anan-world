package io.ananworld.authservice.repository.custom;

import io.ananworld.authservice.domain.dto.UserDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserRepositoryCustom {
    List<UserDto> list();
}
