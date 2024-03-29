package io.ananworld.authservice.domain.dto;

import io.ananworld.authservice.domain.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserDto {

    private Long id;
    private String username;
    private String password;
    private String name;

    public UserDto(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.name = user.getName();
    }
}
