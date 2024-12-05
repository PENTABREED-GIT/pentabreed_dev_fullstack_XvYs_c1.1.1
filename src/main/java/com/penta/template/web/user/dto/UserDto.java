package com.penta.template.web.user.dto;

import com.penta.template.common.enums.Role;
import com.penta.template.web.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

@Getter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    private Long id;
    private String userId;
    private Role role;


    public UserDto(User user) {
        this.id = user.getId();
        this.userId = user.getUserId();
        this.role = user.getRole();
    }
}
