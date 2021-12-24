package io.ananworld.authservice.repository;

import io.ananworld.authservice.domain.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, String> {

}
