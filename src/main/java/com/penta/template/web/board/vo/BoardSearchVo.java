package com.penta.template.web.board.vo;

import com.penta.template.common.vo.PagingVo;
import lombok.*;

@Getter
@NoArgsConstructor
public class BoardSearchVo extends PagingVo {

    private String search;

    public BoardSearchVo(int limit, int offset, String search) {
        super(limit, offset);
        this.search = search;
    }

    public BoardSearchVo(String search) {
        this.search = search;
    }

    @Override
    public String toString() {
        return "BoardSearchVo{" +
                "search='" + search + '\'' +
                "} " + super.toString();
    }
}
