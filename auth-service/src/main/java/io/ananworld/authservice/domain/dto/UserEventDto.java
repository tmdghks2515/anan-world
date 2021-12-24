package io.ananworld.authservice.domain.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserEventDto {
    private String username;
    private String email;
}
