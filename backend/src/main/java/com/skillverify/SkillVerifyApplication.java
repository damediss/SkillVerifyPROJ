package com.skillverify;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.skillverify.domain")
public class SkillVerifyApplication {

    public static void main(String[] args) {
        SpringApplication.run(SkillVerifyApplication.class, args);
    }
}
