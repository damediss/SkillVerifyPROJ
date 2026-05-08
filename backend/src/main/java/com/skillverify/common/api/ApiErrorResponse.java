package com.skillverify.common.api;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record ApiErrorResponse(int code, String message, List<FieldErrorItem> errors) {}
