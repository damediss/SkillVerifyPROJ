package com.skillverify.common.api;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record ApiResponse<T>(int code, String message, T data) {

    public static final int CODE_SUCCESS = 0;

    public static <T> ApiResponse<T> ok(T data) {
        return new ApiResponse<>(CODE_SUCCESS, "success", data);
    }

    public static ApiResponse<Void> ok() {
        return new ApiResponse<>(CODE_SUCCESS, "success", null);
    }

    public static <T> ApiResponse<T> fail(int code, String message) {
        return new ApiResponse<>(code, message, null);
    }
}
