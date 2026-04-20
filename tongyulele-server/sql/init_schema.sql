-- ============================================================
-- 童语乐乐 (TongYuLeLe) 数据库初始化脚本
-- 数据库: tongyulele
-- 编码:   utf8mb4 / utf8mb4_unicode_ci
-- 作者:   tongyulele-server2
-- 日期:   2026-04-20
-- ============================================================

USE `tongyulele`;

-- ============================================================
-- 1. 用户表
--    存储家长账号信息及关联孩子基本信息
-- ============================================================
CREATE TABLE IF NOT EXISTS `t_user` (
    `id`              BIGINT UNSIGNED    NOT NULL AUTO_INCREMENT          COMMENT '主键 ID',
    `openid`          VARCHAR(64)        NOT NULL DEFAULT ''              COMMENT '微信 openid（第三方登录唯一标识）',
    `phone`           VARCHAR(20)        NOT NULL DEFAULT ''              COMMENT '家长手机号',
    `nickname`        VARCHAR(64)        NOT NULL DEFAULT ''              COMMENT '家长昵称',
    `avatar_url`      VARCHAR(512)       NOT NULL DEFAULT ''              COMMENT '头像 URL',
    `password_hash`   VARCHAR(128)       NOT NULL DEFAULT ''              COMMENT '登录密码哈希（bcrypt）',
    `child_name`      VARCHAR(32)        NOT NULL DEFAULT ''              COMMENT '孩子姓名',
    `child_birthday`  DATE                        DEFAULT NULL            COMMENT '孩子生日',
    `child_gender`    TINYINT UNSIGNED   NOT NULL DEFAULT 0               COMMENT '孩子性别：0-未知 1-男 2-女',
    `child_avatar`    VARCHAR(512)       NOT NULL DEFAULT ''              COMMENT '孩子头像 URL',
    `device_id`       BIGINT UNSIGNED             DEFAULT NULL            COMMENT '绑定设备 ID（关联 t_device.id）',
    `status`          TINYINT UNSIGNED   NOT NULL DEFAULT 1               COMMENT '账号状态：0-禁用 1-正常',
    `created_at`      DATETIME           NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at`      DATETIME           NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `deleted_at`      DATETIME                    DEFAULT NULL            COMMENT '软删除时间（NULL 表示未删除）',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_phone`  (`phone`),
    UNIQUE KEY `uk_openid` (`openid`),
    KEY `idx_device_id`    (`device_id`),
    KEY `idx_created_at`   (`created_at`)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci
  COMMENT='用户表（家长账号及孩子基本信息）';


-- ============================================================
-- 2. 设备表
--    管理树莓派终端设备，含在线状态与唤醒词配置
-- ============================================================
CREATE TABLE IF NOT EXISTS `t_device` (
    `id`              BIGINT UNSIGNED    NOT NULL AUTO_INCREMENT          COMMENT '主键 ID',
    `device_sn`       VARCHAR(64)        NOT NULL DEFAULT ''              COMMENT '设备序列号（出厂唯一编码）',
    `device_name`     VARCHAR(64)        NOT NULL DEFAULT ''              COMMENT '设备别名（家长自定义）',
    `model`           VARCHAR(64)        NOT NULL DEFAULT 'Raspberry Pi'  COMMENT '设备型号',
    `firmware_ver`    VARCHAR(32)        NOT NULL DEFAULT ''              COMMENT '固件版本号',
    `wake_word`       VARCHAR(32)        NOT NULL DEFAULT '小乐小乐'       COMMENT '唤醒词',
    `ip_address`      VARCHAR(45)        NOT NULL DEFAULT ''              COMMENT '最近一次 IP 地址（兼容 IPv6）',
    `mac_address`     VARCHAR(17)        NOT NULL DEFAULT ''              COMMENT 'MAC 地址（格式 XX:XX:XX:XX:XX:XX）',
    `is_online`       TINYINT UNSIGNED   NOT NULL DEFAULT 0               COMMENT '在线状态：0-离线 1-在线',
    `last_online_at`  DATETIME                    DEFAULT NULL            COMMENT '最近一次上线时间',
    `bind_user_id`    BIGINT UNSIGNED             DEFAULT NULL            COMMENT '绑定家长用户 ID（关联 t_user.id）',
    `location`        VARCHAR(128)       NOT NULL DEFAULT ''              COMMENT '设备安装位置描述（如：儿童房）',
    `created_at`      DATETIME           NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at`      DATETIME           NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `deleted_at`      DATETIME                    DEFAULT NULL            COMMENT '软删除时间',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_device_sn`   (`device_sn`),
    UNIQUE KEY `uk_mac_address` (`mac_address`),
    KEY `idx_bind_user_id`      (`bind_user_id`),
    KEY `idx_is_online`         (`is_online`)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci
  COMMENT='设备表（树莓派终端、在线状态、唤醒词）';


-- ============================================================
-- 3. 聊天记录表
--    存储儿童与 AI 的完整对话内容，含声纹标记
-- ============================================================
CREATE TABLE IF NOT EXISTS `t_chat_record` (
    `id`              BIGINT UNSIGNED    NOT NULL AUTO_INCREMENT          COMMENT '主键 ID',
    `session_id`      VARCHAR(64)        NOT NULL DEFAULT ''              COMMENT '会话 ID（同一轮对话共享）',
    `user_id`         BIGINT UNSIGNED    NOT NULL                         COMMENT '所属用户 ID（关联 t_user.id）',
    `device_id`       BIGINT UNSIGNED    NOT NULL                         COMMENT '发起设备 ID（关联 t_device.id）',
    `role`            TINYINT UNSIGNED   NOT NULL DEFAULT 1               COMMENT '发言角色：1-孩子 2-AI助手',
    `content_type`    TINYINT UNSIGNED   NOT NULL DEFAULT 1               COMMENT '内容类型：1-文本 2-音频 3-混合',
    `content_text`    TEXT                        DEFAULT NULL            COMMENT '对话文本内容（ASR 转录结果）',
    `audio_url`       VARCHAR(512)       NOT NULL DEFAULT ''              COMMENT '原始音频文件 OSS 路径',
    `duration_ms`     INT UNSIGNED       NOT NULL DEFAULT 0               COMMENT '音频时长（毫秒）',
    `voiceprint_id`   VARCHAR(64)        NOT NULL DEFAULT ''              COMMENT '声纹特征 ID（声纹识别标记，空表示未识别）',
    `emotion_tag`     VARCHAR(32)        NOT NULL DEFAULT ''              COMMENT 'AI 情绪识别标签（如：开心、好奇、沮丧）',
    `topic_tag`       VARCHAR(64)        NOT NULL DEFAULT ''              COMMENT '话题标签（如：故事、学习、问答）',
    `ai_model`        VARCHAR(64)        NOT NULL DEFAULT ''              COMMENT '使用的 AI 模型版本',
    `tokens_used`     INT UNSIGNED       NOT NULL DEFAULT 0               COMMENT '本次对话消耗 Token 数',
    `chat_at`         DATETIME           NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '对话发生时间',
    `created_at`      DATETIME           NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '记录创建时间',
    PRIMARY KEY (`id`),
    KEY `idx_session_id`  (`session_id`),
    KEY `idx_user_id`     (`user_id`),
    KEY `idx_device_id`   (`device_id`),
    KEY `idx_chat_at`     (`chat_at`),
    KEY `idx_voiceprint`  (`voiceprint_id`)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci
  COMMENT='聊天记录表（儿童对话内容、时间、声纹标记）';


-- ============================================================
-- 4. 安全报警表
--    记录烟雾/燃气等安全传感器报警事件及处理状态
-- ============================================================
CREATE TABLE IF NOT EXISTS `t_alarm` (
    `id`              BIGINT UNSIGNED    NOT NULL AUTO_INCREMENT          COMMENT '主键 ID',
    `device_id`       BIGINT UNSIGNED    NOT NULL                         COMMENT '触发报警的设备 ID（关联 t_device.id）',
    `user_id`         BIGINT UNSIGNED    NOT NULL                         COMMENT '归属家长用户 ID（关联 t_user.id）',
    `alarm_type`      TINYINT UNSIGNED   NOT NULL DEFAULT 1               COMMENT '报警类型：1-烟雾 2-燃气 3-CO 4-温度异常 5-其他',
    `alarm_level`     TINYINT UNSIGNED   NOT NULL DEFAULT 1               COMMENT '报警级别：1-低 2-中 3-高 4-紧急',
    `sensor_value`    DECIMAL(10, 2)     NOT NULL DEFAULT 0.00            COMMENT '传感器原始数值',
    `sensor_unit`     VARCHAR(16)        NOT NULL DEFAULT ''              COMMENT '传感器单位（如：ppm、℃）',
    `threshold_value` DECIMAL(10, 2)     NOT NULL DEFAULT 0.00            COMMENT '报警阈值',
    `alarm_at`        DATETIME           NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '报警触发时间',
    `handle_status`   TINYINT UNSIGNED   NOT NULL DEFAULT 0               COMMENT '处理状态：0-未处理 1-已通知 2-已确认 3-已处理 4-误报',
    `handle_note`     VARCHAR(512)       NOT NULL DEFAULT ''              COMMENT '处理备注',
    `handled_at`      DATETIME                    DEFAULT NULL            COMMENT '处理时间',
    `handled_by`      BIGINT UNSIGNED             DEFAULT NULL            COMMENT '处理人用户 ID',
    `notify_channels` VARCHAR(128)       NOT NULL DEFAULT ''              COMMENT '通知渠道（JSON 数组，如：["sms","app","call"]）',
    `created_at`      DATETIME           NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '记录创建时间',
    `updated_at`      DATETIME           NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    KEY `idx_device_id`     (`device_id`),
    KEY `idx_user_id`       (`user_id`),
    KEY `idx_alarm_type`    (`alarm_type`),
    KEY `idx_alarm_at`      (`alarm_at`),
    KEY `idx_handle_status` (`handle_status`)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci
  COMMENT='安全报警表（烟雾/燃气报警、触发时间、处理状态）';


-- ============================================================
-- 5. 成长数据表
--    记录孩子每日学习成果、互动次数及能力成长轨迹
-- ============================================================
CREATE TABLE IF NOT EXISTS `t_growth_record` (
    `id`                  BIGINT UNSIGNED    NOT NULL AUTO_INCREMENT      COMMENT '主键 ID',
    `user_id`             BIGINT UNSIGNED    NOT NULL                     COMMENT '所属用户 ID（关联 t_user.id）',
    `device_id`           BIGINT UNSIGNED    NOT NULL                     COMMENT '所属设备 ID（关联 t_device.id）',
    `record_date`         DATE               NOT NULL                     COMMENT '记录日期（统计维度：天）',
    `interact_count`      INT UNSIGNED       NOT NULL DEFAULT 0           COMMENT '当日与 AI 互动总次数',
    `chat_duration_sec`   INT UNSIGNED       NOT NULL DEFAULT 0           COMMENT '当日对话总时长（秒）',
    `story_count`         INT UNSIGNED       NOT NULL DEFAULT 0           COMMENT '当日听故事次数',
    `question_count`      INT UNSIGNED       NOT NULL DEFAULT 0           COMMENT '当日提问次数',
    `new_words_count`     INT UNSIGNED       NOT NULL DEFAULT 0           COMMENT '当日新学词汇数量',
    `correct_answer_cnt`  INT UNSIGNED       NOT NULL DEFAULT 0           COMMENT '当日答题正确次数',
    `total_answer_cnt`    INT UNSIGNED       NOT NULL DEFAULT 0           COMMENT '当日答题总次数',
    `emotion_happy_cnt`   INT UNSIGNED       NOT NULL DEFAULT 0           COMMENT '情绪分析：开心次数',
    `emotion_sad_cnt`     INT UNSIGNED       NOT NULL DEFAULT 0           COMMENT '情绪分析：沮丧次数',
    `emotion_angry_cnt`   INT UNSIGNED       NOT NULL DEFAULT 0           COMMENT '情绪分析：生气次数',
    `ability_language`    TINYINT UNSIGNED   NOT NULL DEFAULT 0           COMMENT '语言能力评分（0-100）',
    `ability_logic`       TINYINT UNSIGNED   NOT NULL DEFAULT 0           COMMENT '逻辑思维评分（0-100）',
    `ability_creativity`  TINYINT UNSIGNED   NOT NULL DEFAULT 0           COMMENT '创造力评分（0-100）',
    `ability_social`      TINYINT UNSIGNED   NOT NULL DEFAULT 0           COMMENT '社交情感评分（0-100）',
    `star_count`          INT UNSIGNED       NOT NULL DEFAULT 0           COMMENT '当日获得小星星奖励数',
    `summary_text`        TEXT                        DEFAULT NULL        COMMENT 'AI 生成的当日成长总结（家长报告）',
    `created_at`          DATETIME           NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '记录创建时间',
    `updated_at`          DATETIME           NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_user_date`   (`user_id`, `record_date`),
    KEY `idx_device_id`         (`device_id`),
    KEY `idx_record_date`       (`record_date`)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci
  COMMENT='成长数据表（学习记录、互动次数、能力评分）';


-- ============================================================
-- 外键约束（可选：生产环境建议开启，开发环境可注释）
-- ============================================================

-- 用户表 → 设备表
ALTER TABLE `t_user`
    ADD CONSTRAINT `fk_user_device`
    FOREIGN KEY (`device_id`) REFERENCES `t_device` (`id`)
    ON DELETE SET NULL ON UPDATE CASCADE;

-- 设备表 → 用户表（绑定关系）
ALTER TABLE `t_device`
    ADD CONSTRAINT `fk_device_user`
    FOREIGN KEY (`bind_user_id`) REFERENCES `t_user` (`id`)
    ON DELETE SET NULL ON UPDATE CASCADE;

-- 聊天记录 → 用户表
ALTER TABLE `t_chat_record`
    ADD CONSTRAINT `fk_chat_user`
    FOREIGN KEY (`user_id`) REFERENCES `t_user` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE;

-- 聊天记录 → 设备表
ALTER TABLE `t_chat_record`
    ADD CONSTRAINT `fk_chat_device`
    FOREIGN KEY (`device_id`) REFERENCES `t_device` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE;

-- 安全报警 → 设备表
ALTER TABLE `t_alarm`
    ADD CONSTRAINT `fk_alarm_device`
    FOREIGN KEY (`device_id`) REFERENCES `t_device` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE;

-- 安全报警 → 用户表
ALTER TABLE `t_alarm`
    ADD CONSTRAINT `fk_alarm_user`
    FOREIGN KEY (`user_id`) REFERENCES `t_user` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE;

-- 成长数据 → 用户表
ALTER TABLE `t_growth_record`
    ADD CONSTRAINT `fk_growth_user`
    FOREIGN KEY (`user_id`) REFERENCES `t_user` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE;

-- 成长数据 → 设备表
ALTER TABLE `t_growth_record`
    ADD CONSTRAINT `fk_growth_device`
    FOREIGN KEY (`device_id`) REFERENCES `t_device` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE;
