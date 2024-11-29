package com.penta.template.common.handler;

import com.penta.template.common.exception.DuplicateUserIdException;
import com.penta.template.common.response.ApiErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;


@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {

    // 순수 API 예외처리만 여기에 작성...
    // 시큐리티는 X

    @ResponseBody
    @ExceptionHandler(DuplicateUserIdException.class)
    public ApiErrorResponse duplicateUserIdExceptionHandler(DuplicateUserIdException ex) {
        log.info("duplicateUserIdExceptionHandler = {}", ex.getMessage());
        return new ApiErrorResponse(ex.getMessage());
    }

    @ResponseBody
    @ExceptionHandler(RuntimeException.class)
    public ApiErrorResponse runTimeExceptionHandler(RuntimeException ex) {
        log.info("runTimeExceptionHandler = {}", ex.getMessage());
        return new ApiErrorResponse(ex.getMessage());
    }


}
