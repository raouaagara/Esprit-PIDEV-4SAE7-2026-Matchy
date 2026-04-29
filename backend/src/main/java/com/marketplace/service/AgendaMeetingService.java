package com.marketplace.service;

import com.marketplace.dto.Dtos.AgendaClientDto;
import com.marketplace.dto.Dtos.AgendaMeetingRequest;
import com.marketplace.dto.Dtos.AgendaMeetingResponse;
import com.marketplace.entity.AgendaMeeting;
import com.marketplace.entity.AgendaMeeting.AgendaStatus;
import com.marketplace.entity.Notification.NotificationType;
import com.marketplace.entity.Purchase;
import com.marketplace.entity.User;
import com.marketplace.repository.AgendaMeetingRepository;
import com.marketplace.repository.ProjectRepository;
import com.marketplace.repository.PurchaseRepository;
import com.marketplace.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AgendaMeetingService {

    private static final Logger log = LoggerFactory.getLogger(AgendaMeetingService.class);

    @Autowired private AgendaMeetingRepository agendaRepo;
    @Autowired private UserRepository userRepo;
    @Autowired private ProjectRepository projectRepo;
    @Autowired private PurchaseRepository purchaseRepo;
    @Autowired private NotificationService notifService;
    @Autowired private EmailReminderService emailService;

    @Transactional
    public AgendaMeetingResponse create(String organizerEmail, AgendaMeetingRequest req) {
        User organizer = userRepo.findByEmail(organizerEmail)
                .orElseThrow(() -> new RuntimeException("Organizer not found"));
        User client = userRepo.findById(req.getClientId())
                .orElseThrow(() -> new RuntimeException("Client not found"));

        AgendaMeeting meeting = new AgendaMeeting();
        meeting.setTitle(req.getTitle());
        meeting.setNotes(req.getNotes());
        meeting.setScheduledAt(LocalDateTime.parse(req.getScheduledAt()));
        meeting.setDurationMinutes(req.getDurationMinutes() > 0 ? req.getDurationMinutes() : 60);
        meeting.setOrganizer(organizer);
        meeting.setClient(client);
        if (req.getProjectId() != null) {
            projectRepo.findById(req.getProjectId()).ifPresent(meeting::setProject);
        }

        AgendaMeeting saved = agendaRepo.save(meeting);

        // Notification in-app
        try {
            String content = String.format(
                    "Vous avez une réunion planifiée avec %s le %s",
                    organizer.getName(), formatDateTime(saved.getScheduledAt()));
            notifService.sendNotification(client, organizer, content,
                    saved.getProject() != null ? saved.getProject().getId() : null,
                    saved.getProject() != null ? saved.getProject().getTitle() : null,
                    null, NotificationType.MEETING_SCHEDULED);
        } catch (Exception e) {
            log.warn("Notification failed for meeting {}: {}", saved.getId(), e.getMessage());
        }

        // Email au client — strings extraites ici (dans la session Hibernate)
        // avant de passer au thread @Async
        String clientEmail   = client.getEmail();
        String clientName    = client.getName();
        String organizerName = organizer.getName();
        String title         = saved.getTitle();
        String dateStr       = formatDateTime(saved.getScheduledAt());

        emailService.sendMeetingCreatedEmail(clientEmail, clientName, organizerName, title, dateStr);

        return toResponse(saved);
    }

    public List<AgendaMeetingResponse> getUpcomingForOrganizer(String email, int minutes) {
        User organizer = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        LocalDateTime from = LocalDateTime.now();
        LocalDateTime to   = LocalDateTime.now().plusMinutes(minutes);
        return agendaRepo.findByOrganizerAndScheduledAtBetweenAndStatus(
                organizer, from, to, AgendaStatus.SCHEDULED)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public List<AgendaMeetingResponse> getForOrganizer(String email) {
        User organizer = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return agendaRepo.findByOrganizerOrderByScheduledAtAsc(organizer)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public List<AgendaMeetingResponse> getForClient(String email) {
        User client = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return agendaRepo.findByClientOrderByScheduledAtAsc(client)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public List<AgendaClientDto> getClientsForOrganizer(String organizerEmail) {
        User organizer = userRepo.findByEmail(organizerEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<User> fromPurchases = purchaseRepo.findByOrganizerAndStatus(
                organizer, Purchase.PurchaseStatus.ACCEPTED)
                .stream()
                .collect(Collectors.toMap(
                        p -> p.getClient().getId(),
                        p -> p.getClient(),
                        (a, b) -> a))
                .values().stream()
                .collect(Collectors.toList());

        if (!fromPurchases.isEmpty()) {
            return fromPurchases.stream()
                    .map(c -> new AgendaClientDto(c.getId(), c.getName(), c.getEmail()))
                    .collect(Collectors.toList());
        }

        return userRepo.findAll().stream()
                .filter(u -> u.getRole() == User.Role.CLIENT)
                .map(c -> new AgendaClientDto(c.getId(), c.getName(), c.getEmail()))
                .collect(Collectors.toList());
    }

    @Transactional
    public AgendaMeetingResponse update(Long id, String organizerEmail, AgendaMeetingRequest req) {
        AgendaMeeting meeting = agendaRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Meeting not found"));
        if (!meeting.getOrganizer().getEmail().equals(organizerEmail)) {
            throw new RuntimeException("Unauthorized");
        }

        meeting.setTitle(req.getTitle());
        if (req.getNotes() != null) meeting.setNotes(req.getNotes());
        meeting.setScheduledAt(LocalDateTime.parse(req.getScheduledAt()));
        if (req.getDurationMinutes() > 0) meeting.setDurationMinutes(req.getDurationMinutes());
        meeting.setUpdatedAt(LocalDateTime.now());
        meeting.setReminderSentOrganizer(false);
        meeting.setReminderSentClient(false);

        AgendaMeeting saved = agendaRepo.save(meeting);

        // Notification in-app
        String content = String.format(
                "La réunion \"%s\" avec %s a été modifiée. Nouvelle date : %s",
                saved.getTitle(), saved.getOrganizer().getName(),
                formatDateTime(saved.getScheduledAt()));
        notifService.sendNotification(saved.getClient(), saved.getOrganizer(), content,
                saved.getProject() != null ? saved.getProject().getId() : null,
                saved.getProject() != null ? saved.getProject().getTitle() : null,
                null, NotificationType.MEETING_UPDATED);

        // Email au client
        emailService.sendMeetingUpdatedEmail(
                saved.getClient().getEmail(),
                saved.getClient().getName(),
                saved.getOrganizer().getName(),
                saved.getTitle(),
                formatDateTime(saved.getScheduledAt()));

        return toResponse(saved);
    }

    @Transactional
    public void cancel(Long id, String organizerEmail) {
        AgendaMeeting meeting = agendaRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Meeting not found"));
        if (!meeting.getOrganizer().getEmail().equals(organizerEmail)) {
            throw new RuntimeException("Unauthorized");
        }

        // Extraire les strings avant de changer le statut
        String clientEmail   = meeting.getClient().getEmail();
        String clientName    = meeting.getClient().getName();
        String organizerName = meeting.getOrganizer().getName();
        String title         = meeting.getTitle();
        String dateStr       = formatDateTime(meeting.getScheduledAt());
        Long   projectId     = meeting.getProject() != null ? meeting.getProject().getId() : null;
        String projectTitle  = meeting.getProject() != null ? meeting.getProject().getTitle() : null;

        meeting.setStatus(AgendaStatus.CANCELLED);
        meeting.setUpdatedAt(LocalDateTime.now());
        agendaRepo.save(meeting);

        // Notification in-app
        notifService.sendNotification(meeting.getClient(), meeting.getOrganizer(),
                String.format("La réunion \"%s\" prévue le %s avec %s a été annulée.",
                        title, dateStr, organizerName),
                projectId, projectTitle, null, NotificationType.MEETING_CANCELLED);

        // Email au client
        emailService.sendMeetingCancelledEmail(clientEmail, clientName, organizerName, title, dateStr);
    }

    @Transactional
    public void sendReminders() {
        LocalDateTime from = LocalDateTime.now().plusMinutes(14);
        LocalDateTime to   = LocalDateTime.now().plusMinutes(16);
        List<AgendaMeeting> meetings = agendaRepo.findMeetingsForReminder(from, to);

        for (AgendaMeeting m : meetings) {
            if (!m.isReminderSentOrganizer()) {
                notifService.sendNotification(
                        m.getOrganizer(), null,
                        String.format("Rappel : réunion \"%s\" avec %s dans 15 minutes",
                                m.getTitle(), m.getClient().getName()),
                        m.getProject() != null ? m.getProject().getId() : null,
                        m.getProject() != null ? m.getProject().getTitle() : null,
                        null, NotificationType.MEETING_REMINDER);
                m.setReminderSentOrganizer(true);
            }
            if (!m.isReminderSentClient()) {
                notifService.sendNotification(
                        m.getClient(), m.getOrganizer(),
                        String.format("Vous avez une réunion avec %s dans 15 minutes",
                                m.getOrganizer().getName()),
                        m.getProject() != null ? m.getProject().getId() : null,
                        m.getProject() != null ? m.getProject().getTitle() : null,
                        null, NotificationType.MEETING_REMINDER);
                m.setReminderSentClient(true);
            }
            agendaRepo.save(m);
        }
    }

    private AgendaMeetingResponse toResponse(AgendaMeeting m) {
        AgendaMeetingResponse r = new AgendaMeetingResponse();
        r.setId(m.getId());
        r.setTitle(m.getTitle());
        r.setNotes(m.getNotes());
        r.setScheduledAt(m.getScheduledAt());
        r.setDurationMinutes(m.getDurationMinutes());
        r.setClientId(m.getClient().getId());
        r.setClientName(m.getClient().getName());
        r.setOrganizerId(m.getOrganizer().getId());
        r.setOrganizerName(m.getOrganizer().getName());
        if (m.getProject() != null) {
            r.setProjectId(m.getProject().getId());
            r.setProjectTitle(m.getProject().getTitle());
        }
        r.setStatus(m.getStatus().name());
        r.setCreatedAt(m.getCreatedAt());
        r.setUpdatedAt(m.getUpdatedAt());
        return r;
    }

    private String formatDateTime(LocalDateTime dt) {
        return String.format("%02d/%02d/%d à %02d:%02d",
                dt.getDayOfMonth(), dt.getMonthValue(), dt.getYear(),
                dt.getHour(), dt.getMinute());
    }
}
