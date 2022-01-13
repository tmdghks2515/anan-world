package io.ananworld.authservice.domain.entity;

import io.ananworld.authservice.domain.dto.RoleDto;
import io.ananworld.authservice.domain.dto.UserDto;
import io.ananworld.authservice.repository.RoleRepository;
import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@ToString
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Entity
public class User extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false, unique = true, length = 30)
    private String username;

    private String password;

    @Column(nullable = false, length = 60)
    private String name;

    @Column(name = "email", unique = true)
    private String email;

    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.ALL})
    @JoinTable(name = "user_role",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles;

    public User(UserDto dto) {
        this.username = dto.getUsername();
        this.email = dto.getEmail();
        this.name = dto.getName();
    }

    public void setRoleAndPW(Set<Role> roles, String password) {
      this.roles = roles;
      this.password = password;
    }

    public Set<RoleDto> getRoles() {
        Set<RoleDto> roleDtos = new HashSet<>();
        if (!roles.isEmpty()) {
            roles.forEach(role -> {
                roleDtos.add(role.toDto());
            });
        }
        return roleDtos;
    }

}
