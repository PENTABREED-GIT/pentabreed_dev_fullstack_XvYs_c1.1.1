package com.penta.template.common.response;

import lombok.Getter;

import java.util.HashMap;
import java.util.Map;

/**
 * * API 컨트롤러가 사용하는 응답 Response
 */
@Getter
public class ApiResponse<T> {

    // 성공 여부
    private final boolean status = true;

    // 데이터
    private T data ;

    // 부가 데이터
    private Map<String, Object> metaData = new HashMap<>();

    public ApiResponse() {
    }

    public ApiResponse(T data) {
        this.data = data;
    }

    public ApiResponse(T data, Map<String, Object> metaData) {
        this.data = data;
        this.metaData = metaData;
    }

}
