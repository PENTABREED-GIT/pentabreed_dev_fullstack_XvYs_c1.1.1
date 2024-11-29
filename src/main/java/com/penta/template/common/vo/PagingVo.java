package com.penta.template.common.vo;

import lombok.*;

@Setter
@Getter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PagingVo {

    // paging
    private int limit;
    private int offset;

    // between
    private int start;
    private int end;

}
