package com.marketplace.scheduler;

import com.marketplace.entity.Meeting;
import com.marketplace.repository.MeetingRepository;
import com.marketplace.service.MeetingService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class MeetingScheduler {

    private static final Logger log = LoggerFactory.getLogger(MeetingScheduler.class);

    @Autowired private MeetingRepository meetingRepository;
    @Autowired private MeetingService meetingService;

    @Scheduled(fixedRate = 60_000)
    @Transactional
    public void sendUpcomingReminders() {
        LocalDateTime from = LocalDateTime.now().plusMinutes(4);
        LocalDateTime to   = LocalDateTime.now().plusMinutes(6);
        List<Meeting> meetings = meetingRepository.findMeetingsForReminder(from, to);
        for (Meeting m : meetings) {
            try {
                meetingService.sendReminderForMeeting(m);
                log.info("Reminder sent for meeting {}", m.getId());
            } catch (Exception e) {
                log.error("Failed to send reminder for meeting {}: {}", m.getId(), e.getMessage());
            }
        }
    }
}
