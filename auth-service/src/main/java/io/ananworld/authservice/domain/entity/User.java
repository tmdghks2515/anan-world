package io.ananworld.authservice.domain.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Set;

@ToString
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false, unique = true, length = 30)
    private String username;

    private String password;

    @Column(nullable = false, length = 60)
    private String name;

    @Column(name = "email")
    private String email;

    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.ALL})
    @JoinTable(name = "user_role",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles;
}
