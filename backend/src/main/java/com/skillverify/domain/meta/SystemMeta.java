package com.skillverify.domain.meta;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@TableName("system_meta")
@Getter
@Setter
@NoArgsConstructor
public class SystemMeta {

    @TableId("meta_key")
    private String metaKey;

    @TableField("meta_value")
    private String metaValue;
}
