package com.penta.template.common.exception;

public class BoardInsertException extends RuntimeException{

    public BoardInsertException() {
        super("게시글 저장 에러");
    }

    public BoardInsertException(String message) {
        super(message);
    }

    public BoardInsertException(String message, Throwable cause) {
        super(message, cause);
    }

    public BoardInsertException(Throwable cause) {
        super(cause);
    }

    public BoardInsertException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
