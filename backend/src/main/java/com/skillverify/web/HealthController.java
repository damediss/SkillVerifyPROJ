package com.skillverify.web;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.skillverify.common.api.ApiResponse;
import com.skillverify.domain.meta.SystemMetaMapper;
import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class HealthController {

    private final SystemMetaMapper systemMetaMapper;

    public HealthController(SystemMetaMapper systemMetaMapper) {
        this.systemMetaMapper = systemMetaMapper;
    }

    @GetMapping("/health")
    public ApiResponse<Map<String, Object>> health() {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("status", "UP");
        body.put("service", "skill-verify-api");
        body.put("time", Instant.now().toString());

        Map<String, Object> database = new LinkedHashMap<>();
        try {
            database.put("status", "UP");
            database.put("metaRows", systemMetaMapper.selectCount(new LambdaQueryWrapper<>()));
        } catch (Exception e) {
            database.put("status", "DOWN");
        }
        body.put("database", database);

        return ApiResponse.ok(body);
    }
}
