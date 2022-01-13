package io.ananworld.authservice.domain.dto;

import io.ananworld.authservice.domain.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoleDto {
    private String roleName;
    private String roleDescription;

}
