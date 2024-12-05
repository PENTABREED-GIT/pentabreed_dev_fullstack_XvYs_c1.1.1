package com.penta.template.web.board.vo;

import lombok.*;

@Getter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BoardInsertVo {

    private String title;
    private String content;


}
