package com.marketplace.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

/**
 * Widens enum-style VARCHAR columns added before new enum values were introduced.
 * Safe to run on every startup — MySQL MODIFY COLUMN is idempotent.
 */
@Component
public class DbMigrationRunner implements ApplicationRunner {

    private static final Logger log = LoggerFactory.getLogger(DbMigrationRunner.class);

    private final JdbcTemplate jdbc;

    public DbMigrationRunner(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    @Override
    public void run(ApplicationArguments args) {
        widen("chat_messages",  "message_type",       "VARCHAR(50)", "TEXT");
        widen("notifications",  "notification_type",  "VARCHAR(50)", "NEW_MESSAGE");
        makeNullable("chat_messages", "content", "TEXT");
        addColumnIfMissing("chat_messages", "scheduled_at",   "DATETIME NULL");
        addColumnIfMissing("chat_messages", "schedule_sent",  "TINYINT(1) NOT NULL DEFAULT 0");
        addColumnIfMissing("chat_messages", "pinned",         "TINYINT(1) NOT NULL DEFAULT 0");
        addColumnIfMissing("chat_messages", "pinned_at",      "DATETIME NULL");
        addColumnIfMissing("chat_messages", "pinned_by_id",   "BIGINT NULL");
        addColumnIfMissing("chat_messages", "edited",         "TINYINT(1) NOT NULL DEFAULT 0");
        addColumnIfMissing("chat_messages", "edited_at",      "DATETIME NULL");
    }

    private void widen(String table, String column, String type, String defaultVal) {
        try {
            jdbc.execute(
                "ALTER TABLE `" + table + "` MODIFY COLUMN `" + column
                + "` " + type + " NOT NULL DEFAULT '" + defaultVal + "'");
            log.info("DbMigration: {}.{} widened to {}", table, column, type);
        } catch (Exception e) {
            log.warn("DbMigration skipped {}.{}: {}", table, column, e.getMessage());
        }
    }

    private void makeNullable(String table, String column, String type) {
        try {
            jdbc.execute("ALTER TABLE `" + table + "` MODIFY COLUMN `" + column + "` " + type + " NULL");
            log.info("DbMigration: {}.{} made nullable", table, column);
        } catch (Exception e) {
            log.warn("DbMigration makeNullable skipped {}.{}: {}", table, column, e.getMessage());
        }
    }

    private void addColumnIfMissing(String table, String column, String definition) {
        try {
            Integer count = jdbc.queryForObject(
                "SELECT COUNT(*) FROM information_schema.COLUMNS " +
                "WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?",
                Integer.class, table, column);
            if (count == null || count == 0) {
                jdbc.execute("ALTER TABLE `" + table + "` ADD COLUMN `" + column + "` " + definition);
                log.info("DbMigration: added {}.{}", table, column);
            }
        } catch (Exception e) {
            log.warn("DbMigration addColumn skipped {}.{}: {}", table, column, e.getMessage());
        }
    }
}
