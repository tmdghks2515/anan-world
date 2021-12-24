package io.ananworld.authservice.service;

import io.ananworld.authservice.domain.entity.Role;
import io.ananworld.authservice.domain.entity.User;
import io.ananworld.authservice.repository.RoleRepository;
import io.ananworld.authservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Lazy;
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

    public User createNewUser(User user) {
        Role role = roleRepository.findById("USER").get();
        Set<Role> roles = new HashSet<>();
        roles.add(role);
        user.setRoles(roles);
        user.setPassword(getEncodedPassword(user.getPassword()));
        return userRepository.save(user);
    }

    private String getEncodedPassword(String password) {
        return passwordEncoder.encode(password);
    }
}
