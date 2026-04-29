package com.marketplace.scheduler;

import com.marketplace.service.ScheduledMessageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ScheduledMessageScheduler {

    private static final Logger log = LoggerFactory.getLogger(ScheduledMessageScheduler.class);

    @Autowired private ScheduledMessageService scheduledMessageService;

    @Scheduled(fixedRate = 30_000)
    public void sendPendingMessages() {
        try {
            scheduledMessageService.processScheduledMessages();
        } catch (Exception e) {
            log.error("processScheduledMessages error: {}", e.getMessage(), e);
        }
    }

    @Scheduled(fixedRate = 60_000)
    public void sendReminders() {
        try {
            scheduledMessageService.process15MinReminders();
        } catch (Exception e) {
            log.error("process15MinReminders error: {}", e.getMessage(), e);
        }
    }
}
