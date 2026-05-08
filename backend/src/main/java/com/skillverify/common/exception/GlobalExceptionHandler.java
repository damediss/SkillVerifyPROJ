package com.skillverify.common.exception;

import com.skillverify.common.api.ApiErrorResponse;
import com.skillverify.common.api.FieldErrorItem;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    public static final int CODE_VALIDATION = 40001;

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiErrorResponse> handleValidation(MethodArgumentNotValidException ex) {
        var errors =
                ex.getBindingResult().getFieldErrors().stream()
                        .map(this::mapFieldError)
                        .collect(Collectors.toList());
        var body = new ApiErrorResponse(CODE_VALIDATION, "参数校验失败", errors);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
    }

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ApiErrorResponse> handleBusiness(BusinessException ex) {
        var body = new ApiErrorResponse(ex.getCode(), ex.getMessage(), null);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiErrorResponse> handleOther(Exception ex) {
        log.error("Unhandled exception", ex);
        var body = new ApiErrorResponse(50000, "服务器内部错误", null);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(body);
    }

    private FieldErrorItem mapFieldError(FieldError fe) {
        String field = fe.getField();
        String msg = fe.getDefaultMessage() != null ? fe.getDefaultMessage() : "无效值";
        return new FieldErrorItem(field, msg);
    }
}
