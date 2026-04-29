package com.marketplace.service;

import com.marketplace.dto.Dtos.*;
import com.marketplace.entity.*;
import com.marketplace.entity.AgendaMeeting.AgendaStatus;
import com.marketplace.entity.ChatMessage.MessageType;
import com.marketplace.entity.Meeting.MeetingStatus;
import com.marketplace.entity.Meeting.MeetingType;
import com.marketplace.entity.Notification.NotificationType;
import com.marketplace.entity.Purchase.PurchaseStatus;
import com.marketplace.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MeetingService {

    private static final Logger log = LoggerFactory.getLogger(MeetingService.class);
    private static final DateTimeFormatter FMT = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");

    @Autowired private MeetingRepository meetingRepository;
    @Autowired private AgendaMeetingRepository agendaMeetingRepository;
    @Autowired private ProjectRepository projectRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private ChatMessageRepository chatMessageRepository;
    @Autowired private PurchaseRepository purchaseRepository;
    @Autowired private NotificationService notificationService;
    @Autowired private ZegoCloudService zegoCloudService;
    @Autowired private SimpMessagingTemplate messaging;

    @Value("${app.base-url:http://localhost:4200}")
    private String baseUrl;

    // ── 1. Instant meeting ────────────────────────────────────────────────────

    public MeetingResponse createInstant(MeetingInstantRequest req, String organizerEmail) {
        log.info("createInstant: email={} projectId={}", organizerEmail, req.getProjectId());
        User organizer = getOrganizer(organizerEmail);
        Project project = getProject(req.getProjectId(), organizerEmail);

        String roomId = zegoCloudService.generateRoomId("meet");
        String token  = generateToken(organizer);

        Meeting meeting = new Meeting();
        meeting.setRoomId(roomId);
        meeting.setOrganizer(organizer);
        meeting.setProject(project);
        meeting.setSubject("Réunion instantanée");
        meeting.setType(MeetingType.INSTANT);
        meeting.setStatus(MeetingStatus.ACTIVE);
        meeting.setStartedAt(LocalDateTime.now());
        meetingRepository.save(meeting);
        log.info("createInstant: meeting saved id={}", meeting.getId());

        // Save to agenda so it appears in /organizer/agenda
        findClientForProject(project).ifPresent(client ->
            createAndBroadcastAgendaEntry(meeting, organizer, client, project));

        sendMeetingChatMessage(project, organizer,
                buildInstantJson(meeting, organizer), MessageType.MEETING_INVITE);

        notifyParticipants(project, organizer,
                "📹 " + organizer.getName() + " a démarré une réunion — Rejoindre maintenant",
                meeting, NotificationType.MEETING_STARTED);

        return toResponse(meeting, token);
    }

    // ── 2. Scheduled meeting ──────────────────────────────────────────────────

    public MeetingResponse schedule(MeetingScheduleRequest req, String organizerEmail) {
        log.info("schedule: email={} projectId={} scheduledAt={}", organizerEmail, req.getProjectId(), req.getScheduledAt());
        User organizer = getOrganizer(organizerEmail);
        Project project = getProject(req.getProjectId(), organizerEmail);

        String roomId = zegoCloudService.generateRoomId("meet");

        Meeting meeting = new Meeting();
        meeting.setRoomId(roomId);
        meeting.setOrganizer(organizer);
        meeting.setProject(project);
        meeting.setSubject(req.getSubject() != null ? req.getSubject() : "Réunion planifiée");
        meeting.setType(MeetingType.SCHEDULED);
        meeting.setStatus(MeetingStatus.WAITING);
        meeting.setScheduledAt(req.getScheduledAt());
        meetingRepository.save(meeting);

        sendMeetingChatMessage(project, organizer,
                buildScheduledJson(meeting, organizer), MessageType.MEETING_INVITE);

        notifyParticipants(project, organizer,
                "📅 Réunion planifiée : " + meeting.getSubject()
                        + " — " + req.getScheduledAt().format(FMT),
                meeting, NotificationType.MEETING_SCHEDULED);

        // Save to agenda — use explicit clientId if provided, otherwise find from purchases
        if (req.getClientId() != null) {
            userRepository.findById(req.getClientId()).ifPresent(client ->
                createAndBroadcastAgendaEntry(meeting, organizer, client, project));
        } else {
            findClientForProject(project).ifPresent(client ->
                createAndBroadcastAgendaEntry(meeting, organizer, client, project));
        }

        return toResponse(meeting, null);
    }

    // ── 3. Permanent link ─────────────────────────────────────────────────────

    public MeetingResponse createLink(MeetingLinkRequest req, String organizerEmail) {
        User organizer = getOrganizer(organizerEmail);
        Project project = getProject(req.getProjectId(), organizerEmail);

        String roomId = zegoCloudService.generateRoomId("meet");
        String token  = generateToken(organizer);
        String url    = baseUrl + "/meet/" + roomId;

        Meeting meeting = new Meeting();
        meeting.setRoomId(roomId);
        meeting.setOrganizer(organizer);
        meeting.setProject(project);
        meeting.setSubject(req.getSubject() != null ? req.getSubject() : "Lien de réunion");
        meeting.setType(MeetingType.LINK);
        meeting.setStatus(MeetingStatus.ACTIVE);
        meeting.setStartedAt(LocalDateTime.now());
        meetingRepository.save(meeting);

        sendMeetingChatMessage(project, organizer,
                buildLinkJson(meeting, organizer, url), MessageType.MEETING_LINK);

        return toResponse(meeting, token);
    }

    // ── 4. Join ───────────────────────────────────────────────────────────────

    public MeetingJoinResponse join(String roomId, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        Meeting meeting = meetingRepository.findByRoomId(roomId)
                .orElseThrow(() -> new RuntimeException("Réunion introuvable"));

        if (meeting.getStatus() == MeetingStatus.ENDED)
            throw new RuntimeException("Cette réunion est terminée");

        if (meeting.getType() == MeetingType.SCHEDULED
                && meeting.getStatus() == MeetingStatus.WAITING
                && LocalDateTime.now().isAfter(meeting.getScheduledAt().minusMinutes(1))) {
            meeting.setStatus(MeetingStatus.ACTIVE);
            meeting.setStartedAt(LocalDateTime.now());
            meetingRepository.save(meeting);
        }

        String token = generateToken(user);
        return new MeetingJoinResponse(
                meeting.getId(), meeting.getRoomId(),
                meeting.getSubject(), token,
                zegoCloudService.getAppId(),
                meeting.getProject().getId());
    }

    // ── 5. End meeting ────────────────────────────────────────────────────────

    public void end(String roomId, String organizerEmail) {
        Meeting meeting = meetingRepository.findByRoomId(roomId)
                .orElseThrow(() -> new RuntimeException("Réunion introuvable"));

        if (!meeting.getOrganizer().getEmail().equals(organizerEmail))
            throw new RuntimeException("Non autorisé");

        if (meeting.getStatus() == MeetingStatus.ENDED) return;

        meeting.setStatus(MeetingStatus.ENDED);
        meeting.setEndedAt(LocalDateTime.now());
        meetingRepository.save(meeting);

        LocalDateTime start = meeting.getStartedAt() != null
                ? meeting.getStartedAt() : meeting.getCreatedAt();
        long minutes = Duration.between(start, meeting.getEndedAt()).toMinutes();
        String duration = minutes < 1 ? "< 1 min" : minutes + " min";

        List<User> participants = chatMessageRepository
                .findParticipantsByProject(meeting.getProject(), meeting.getOrganizer());
        String names = participants.stream().map(User::getName).collect(Collectors.joining(", "));
        if (!names.isEmpty()) names = meeting.getOrganizer().getName() + ", " + names;
        else names = meeting.getOrganizer().getName();

        sendMeetingChatMessage(meeting.getProject(), meeting.getOrganizer(),
                buildSummaryJson(meeting, duration, names), MessageType.MEETING_SUMMARY);
    }

    // ── 6. Meetings for a project ─────────────────────────────────────────────

    public List<MeetingResponse> getMeetings(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Projet introuvable"));
        return meetingRepository.findByProjectOrderByCreatedAtDesc(project)
                .stream().map(m -> toResponse(m, null)).collect(Collectors.toList());
    }

    // ── Reminder (called by scheduler) ────────────────────────────────────────

    public void sendReminderForMeeting(Meeting meeting) {
        String msg = "⏰ Votre réunion \"" + meeting.getSubject()
                + "\" commence dans 5 minutes — Rejoindre";
        notifyParticipants(meeting.getProject(), meeting.getOrganizer(),
                msg, meeting, NotificationType.MEETING_REMINDER);
        meeting.setReminderSent(true);
        meetingRepository.save(meeting);
    }

    // ── Private helpers ───────────────────────────────────────────────────────

    /** Find the first accepted client for a project via purchases. */
    private Optional<User> findClientForProject(Project project) {
        return purchaseRepository.findByProjectOrderByRequestedAtDesc(project)
                .stream()
                .filter(p -> p.getStatus() == PurchaseStatus.ACCEPTED)
                .map(Purchase::getClient)
                .findFirst();
    }

    /** Create an AgendaMeeting entry and broadcast it to the organizer's agenda WebSocket topic. */
    private void createAndBroadcastAgendaEntry(Meeting meeting, User organizer, User client, Project project) {
        try {
            AgendaMeeting agendaMeeting = new AgendaMeeting();
            agendaMeeting.setTitle(meeting.getSubject());
            agendaMeeting.setScheduledAt(
                meeting.getScheduledAt() != null ? meeting.getScheduledAt() : LocalDateTime.now());
            agendaMeeting.setDurationMinutes(60);
            agendaMeeting.setOrganizer(organizer);
            agendaMeeting.setClient(client);
            agendaMeeting.setProject(project);
            agendaMeeting.setStatus(AgendaStatus.SCHEDULED);
            AgendaMeeting saved = agendaMeetingRepository.save(agendaMeeting);
            messaging.convertAndSend("/topic/agenda/" + organizer.getId(), toAgendaResponse(saved));
            log.info("AgendaMeeting created id={} for meeting roomId={}", saved.getId(), meeting.getRoomId());
        } catch (Exception e) {
            log.error("Failed to create AgendaMeeting for meeting id={}: {}", meeting.getId(), e.getMessage());
        }
    }

    private AgendaMeetingResponse toAgendaResponse(AgendaMeeting m) {
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

    private User getOrganizer(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé: " + email));
        if (user.getRole() != User.Role.ORGANIZER)
            throw new RuntimeException(
                "Accès refusé: l'utilisateur " + email + " a le rôle " + user.getRole()
                + " (ORGANIZER requis)");
        return user;
    }

    private Project getProject(Long projectId, String organizerEmail) {
        Project p = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Projet introuvable: id=" + projectId));
        String projOrgEmail = p.getOrganizer().getEmail();
        if (!projOrgEmail.equals(organizerEmail))
            throw new RuntimeException(
                "Ce projet appartient à " + projOrgEmail + ", pas à " + organizerEmail);
        return p;
    }

    private String generateToken(User user) {
        try {
            return zegoCloudService.generateToken(user.getId().toString(), 3600);
        } catch (Exception e) {
            log.error("Token generation failed: {}", e.getMessage());
            throw new RuntimeException("Impossible de générer le token vidéo");
        }
    }

    private void sendMeetingChatMessage(Project project, User sender, String json, MessageType type) {
        ChatMessage saved = null;
        try {
            ChatMessage msg = new ChatMessage();
            msg.setContent(json);
            msg.setSender(sender);
            msg.setProject(project);
            msg.setMessageType(type);
            saved = chatMessageRepository.save(msg);
        } catch (Exception e) {
            log.error("Failed to save meeting chat message (type={}): {} — broadcasting WS only", type, e.getMessage());
            saved = new ChatMessage();
            saved.setId(-1L);
            saved.setContent(json);
            saved.setSender(sender);
            saved.setProject(project);
            saved.setMessageType(type);
        }
        try {
            messaging.convertAndSend("/topic/chat/" + project.getId(), toChatDto(saved));
        } catch (Exception e2) {
            log.error("Failed to broadcast meeting chat message via WS: {}", e2.getMessage());
        }
    }

    private void notifyParticipants(Project project, User organizer,
                                    String content, Meeting meeting, NotificationType type) {
        try {
            List<User> participants = chatMessageRepository
                    .findParticipantsByProject(project, organizer);
            for (User p : participants) {
                notificationService.sendNotification(
                        p, organizer, content,
                        project.getId(), project.getTitle(),
                        meeting.getId(), type);
            }
            messaging.convertAndSend("/topic/meeting/" + project.getId(),
                    buildMeetingEvent(meeting, content));
        } catch (Exception e) {
            log.error("Failed to notify participants: {}", e.getMessage());
        }
    }

    private MeetingResponse toResponse(Meeting m, String token) {
        String url = m.getType() == MeetingType.LINK
                ? baseUrl + "/meet/" + m.getRoomId() : null;
        return new MeetingResponse(
                m.getId(), m.getRoomId(),
                m.getSubject(),
                m.getType().name(), m.getStatus().name(),
                url,
                m.getScheduledAt(), m.getStartedAt(), m.getEndedAt(),
                m.getOrganizer().getId(), m.getOrganizer().getName(),
                m.getProject().getId(),
                token, zegoCloudService.getAppId());
    }

    private com.marketplace.dto.Dtos.ChatMessageResponse toChatDto(ChatMessage m) {
        com.marketplace.dto.Dtos.ChatMessageResponse res = new com.marketplace.dto.Dtos.ChatMessageResponse();
        res.setId(m.getId());
        res.setContent(m.getContent());
        res.setSenderId(m.getSender().getId());
        res.setSenderName(m.getSender().getName());
        res.setSenderRole(m.getSender().getRole().name());
        res.setProjectId(m.getProject().getId());
        res.setSentAt(m.getSentAt());
        res.setMessageType(m.getMessageType().name());
        return res;
    }

    // ── JSON builders ─────────────────────────────────────────────────────────

    private String buildInstantJson(Meeting m, User organizer) {
        return "{\"meetingId\":" + m.getId()
                + ",\"roomId\":\"" + m.getRoomId() + "\""
                + ",\"subject\":\"" + escape(m.getSubject()) + "\""
                + ",\"type\":\"INSTANT\""
                + ",\"organizerName\":\"" + escape(organizer.getName()) + "\"}";
    }

    private String buildScheduledJson(Meeting m, User organizer) {
        return "{\"meetingId\":" + m.getId()
                + ",\"roomId\":\"" + m.getRoomId() + "\""
                + ",\"subject\":\"" + escape(m.getSubject()) + "\""
                + ",\"type\":\"SCHEDULED\""
                + ",\"scheduledAt\":\"" + m.getScheduledAt() + "\""
                + ",\"organizerName\":\"" + escape(organizer.getName()) + "\"}";
    }

    private String buildLinkJson(Meeting m, User organizer, String url) {
        return "{\"meetingId\":" + m.getId()
                + ",\"roomId\":\"" + m.getRoomId() + "\""
                + ",\"subject\":\"" + escape(m.getSubject()) + "\""
                + ",\"type\":\"LINK\""
                + ",\"meetingUrl\":\"" + url + "\""
                + ",\"organizerName\":\"" + escape(organizer.getName()) + "\"}";
    }

    private String buildSummaryJson(Meeting m, String duration, String participants) {
        return "{\"meetingId\":" + m.getId()
                + ",\"roomId\":\"" + m.getRoomId() + "\""
                + ",\"subject\":\"" + escape(m.getSubject()) + "\""
                + ",\"duration\":\"" + duration + "\""
                + ",\"participants\":\"" + escape(participants) + "\""
                + ",\"startedAt\":\"" + m.getStartedAt() + "\""
                + ",\"endedAt\":\"" + m.getEndedAt() + "\""
                + ",\"type\":\"SUMMARY\"}";
    }

    private java.util.Map<String, Object> buildMeetingEvent(Meeting m, String message) {
        return java.util.Map.of(
                "meetingId", m.getId(),
                "roomId", m.getRoomId(),
                "message", message,
                "type", m.getType().name());
    }

    private static String escape(String s) {
        return s == null ? "" : s.replace("\"", "\\\"");
    }
}
