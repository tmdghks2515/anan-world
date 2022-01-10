package io.ananworld.authservice.repository;

import io.ananworld.authservice.domain.entity.User;
import io.ananworld.authservice.repository.custom.UserRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long>, UserRepositoryCustom {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
}
