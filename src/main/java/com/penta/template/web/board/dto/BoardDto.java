package com.penta.template.web.board.dto;

import com.penta.template.common.enums.Role;
import com.penta.template.web.board.entity.Board;
import com.penta.template.web.user.entity.User;
import lombok.*;

@Getter
@ToString(exclude = "content")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BoardDto {

    private Long id;
    private String title;       // 제목
    private String content;     // 에디터로 작성한 내용
    private String userId;
    private Role role;


    public BoardDto(Board board, User user) {
        this.id = board.getId();
        this.title = board.getTitle();
        this.content = board.getContent();
        this.userId = user.getUserId();
        this.role = Role.valueOf(user.getRole().name());
    }


}
