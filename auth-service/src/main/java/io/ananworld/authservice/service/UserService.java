package io.ananworld.authservice.service;

import io.ananworld.authservice.domain.dto.UserDto;
import io.ananworld.authservice.domain.entity.Role;
import io.ananworld.authservice.domain.entity.User;
import io.ananworld.authservice.repository.RoleRepository;
import io.ananworld.authservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    public void init() {
        Role role = Role.builder()
                .roleName("USER")
                .roleDescription("일반유저")
                .build();

        roleRepository.save(role);
    }

    public User createNewUser(UserDto dto) {
        User user = dto.toEntity();

        Role role = roleRepository.findById("USER").get();
        Set<Role> roles = new HashSet<>();
        roles.add(role);

        user.init(roles, getEncodedPassword(dto.getPassword()));

        return userRepository.save(user);
    }


    private String getEncodedPassword(String password) {
        return passwordEncoder.encode(password);
    }
}
