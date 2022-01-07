package io.ananworld.authservice.domain.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Builder
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
}
