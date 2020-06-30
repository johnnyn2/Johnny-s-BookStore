package com.johnny.bookstore.repository;

import java.util.Optional;

import com.johnny.bookstore.model.Role;
import com.johnny.bookstore.model.RoleName;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long>{
    Optional<Role> findByName(RoleName roleName);
}