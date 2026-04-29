package com.marketplace.service;

import com.marketplace.entity.AgendaMeeting;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class IcsGeneratorService {

    private static final DateTimeFormatter ICS_FMT =
            DateTimeFormatter.ofPattern("yyyyMMdd'T'HHmmss'Z'");

    public String generate(AgendaMeeting meeting, String meetingUrl) {
        ZonedDateTime start = meeting.getScheduledAt()
                .atZone(ZoneId.of("UTC"));
        ZonedDateTime end   = start.plusMinutes(meeting.getDurationMinutes());

        String summary = "Réunion : " + meeting.getTitle();
        String desc    = "Réunion avec " + meeting.getClient().getName()
                + " — " + meeting.getOrganizer().getName();

        return "BEGIN:VCALENDAR\r\n" +
               "VERSION:2.0\r\n" +
               "PRODID:-//Marketplace//FR\r\n" +
               "CALSCALE:GREGORIAN\r\n" +
               "METHOD:REQUEST\r\n" +
               "BEGIN:VEVENT\r\n" +
               "UID:" + meeting.getId() + "@marketplace\r\n" +
               "SUMMARY:" + escape(summary) + "\r\n" +
               "DTSTART:" + ICS_FMT.format(start) + "\r\n" +
               "DTEND:"   + ICS_FMT.format(end)   + "\r\n" +
               "DESCRIPTION:" + escape(desc) + "\r\n" +
               "URL:" + meetingUrl + "\r\n" +
               "STATUS:CONFIRMED\r\n" +
               "END:VEVENT\r\n" +
               "END:VCALENDAR\r\n";
    }

    private static String escape(String s) {
        return s == null ? "" : s.replace("\\", "\\\\").replace(";", "\\;")
                                 .replace(",", "\\,").replace("\n", "\\n");
    }
}
