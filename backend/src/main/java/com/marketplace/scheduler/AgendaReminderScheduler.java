package com.marketplace.scheduler;

import com.marketplace.service.AgendaMeetingService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class AgendaReminderScheduler {

    private static final Logger log = LoggerFactory.getLogger(AgendaReminderScheduler.class);

    @Autowired private AgendaMeetingService agendaService;

    @Scheduled(fixedRate = 60_000)
    public void sendReminders() {
        try {
            agendaService.sendReminders();
        } catch (Exception e) {
            log.error("Failed to send agenda reminders: {}", e.getMessage());
        }
    }
}
