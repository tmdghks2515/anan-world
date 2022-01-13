package io.ananworld.authservice.domain.entity;

import io.ananworld.authservice.domain.dto.RoleDto;
import io.ananworld.authservice.domain.dto.UserDto;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "roles")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Role extends BaseEntity{

    @Id
    @Column(name = "role")
    private String roleName;
    private String roleDescription;

    public Role(RoleDto roleDto) {
        roleName = roleDto.getRoleName();
        roleDescription = roleDto.getRoleDescription();
    }

    public RoleDto toDto() {
        return new RoleDto(roleName, roleDescription);
    }
}
