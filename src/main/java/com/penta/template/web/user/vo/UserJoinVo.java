package com.penta.template.web.user.vo;

import com.penta.template.common.enums.Role;
import lombok.*;

@Getter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserJoinVo {

    private String userId;
    private String userPassword;
    private Role role;

}
