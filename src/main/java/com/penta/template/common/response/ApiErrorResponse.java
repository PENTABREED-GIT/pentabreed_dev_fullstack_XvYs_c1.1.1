package com.penta.template.common.response;

import lombok.Getter;

/**
 * * API 컨트롤러가 사용하는 응답 Response
 */
@Getter
public class ApiErrorResponse {

    // 성공 여부
    private final boolean status = false;

    // 데이터
    private String message;

    public ApiErrorResponse(String message) {
        this.message = message;
    }
}
