package com.penta.template.web.user.repository;

import com.penta.template.web.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    // TODO
    Optional<User> findByUserId(String userId);



}
