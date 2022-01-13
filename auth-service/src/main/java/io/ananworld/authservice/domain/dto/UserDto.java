package io.ananworld.authservice.domain.dto;

import io.ananworld.authservice.domain.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collections;
import java.util.List;
import java.util.Set;

@Builder
@AllArgsConstructor
@Data
public class UserDto {

    private Long id;
    private String username;
    private String password;
    private String name;
    private String email;
    private Set<RoleDto> roles;

    public UserDto() {
        roles = Collections.emptySet();
    }
}
