package com.penta.template.common.vo;

import lombok.*;

@Setter
@Getter
@ToString
@NoArgsConstructor
public class PagingVo {

    // paging
    private int limit;
    private int offset;

    // between
//    private int start;
//    private int end;

    @Builder
    public PagingVo(int limit, int offset) {
        this.limit = limit;
        this.offset = offset;
    }


}
