package com.marketplace.scheduler;

import com.marketplace.entity.AgendaMeeting;
import com.marketplace.repository.AgendaMeetingRepository;
import com.marketplace.service.EmailReminderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class AgendaEmailReminderScheduler {

    private static final Logger log = LoggerFactory.getLogger(AgendaEmailReminderScheduler.class);

    @Autowired private AgendaMeetingRepository agendaRepo;
    @Autowired private EmailReminderService emailService;

    /** Runs every minute. Sends a 24-hour advance email + .ics to both parties. */
    @Scheduled(fixedRate = 60_000)
    @Transactional
    public void send24hReminders() {
        LocalDateTime from = LocalDateTime.now().plusHours(23).plusMinutes(50);
        LocalDateTime to   = LocalDateTime.now().plusHours(24).plusMinutes(10);
        List<AgendaMeeting> meetings = agendaRepo.findMeetingsForDayReminder(from, to);

        for (AgendaMeeting m : meetings) {
            try {
                emailService.sendReminder(m, "dans 24 heures");
                m.setReminder1DaySent(true);
                agendaRepo.save(m);
                log.info("24h email reminder sent for meeting id={}", m.getId());
            } catch (Exception e) {
                log.error("Failed 24h email reminder for meeting id={}: {}", m.getId(), e.getMessage());
            }
        }
    }

    /** Runs every minute. Sends a 15-minute advance email + .ics (in addition to in-app notification). */
    @Scheduled(fixedRate = 60_000)
    @Transactional
    public void send15MinEmailReminders() {
        LocalDateTime from = LocalDateTime.now().plusMinutes(14);
        LocalDateTime to   = LocalDateTime.now().plusMinutes(16);
        List<AgendaMeeting> meetings = agendaRepo.findMeetingsFor15MinEmailReminder(from, to);

        for (AgendaMeeting m : meetings) {
            try {
                emailService.sendReminder(m, "dans 15 minutes");
                log.info("15min email reminder sent for meeting id={}", m.getId());
            } catch (Exception e) {
                log.error("Failed 15min email reminder for meeting id={}: {}", m.getId(), e.getMessage());
            }
        }
    }
}
