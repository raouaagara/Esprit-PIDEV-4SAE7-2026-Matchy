package com.marketplace.service;

import com.marketplace.entity.AgendaMeeting;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;

@Service
public class EmailReminderService {

    private static final Logger log = LoggerFactory.getLogger(EmailReminderService.class);
    private static final DateTimeFormatter DATE_FMT =
            DateTimeFormatter.ofPattern("dd/MM/yyyy 'à' HH:mm");

    @Autowired private JavaMailSender mailSender;
    @Autowired private IcsGeneratorService icsGenerator;

    @Value("${app.base-url:http://localhost:4200}")
    private String baseUrl;

    @Value("${spring.mail.username}")
    private String fromEmail;

    // ── Rappels schedulés (15min / 24h) — appelés par le scheduler ───────────

    public void sendReminder(AgendaMeeting meeting, String label) {
        String meetingUrl = baseUrl + "/meet/" + meeting.getId();
        String icsContent = icsGenerator.generate(meeting, meetingUrl);
        String dateStr    = meeting.getScheduledAt().format(DATE_FMT);

        trySendWithIcs(
            meeting.getOrganizer().getEmail(),
            "Rappel réunion — " + label + " : " + meeting.getTitle(),
            buildReminderHtml(meeting.getOrganizer().getName(), meeting.getClient().getName(),
                              meeting.getTitle(), dateStr, meetingUrl, label),
            icsContent, meeting.getTitle()
        );
        trySendWithIcs(
            meeting.getClient().getEmail(),
            "Rappel réunion — " + label + " : " + meeting.getTitle(),
            buildReminderHtml(meeting.getClient().getName(), meeting.getOrganizer().getName(),
                              meeting.getTitle(), dateStr, meetingUrl, label),
            icsContent, meeting.getTitle()
        );
    }

    // ── Emails événements — acceptent des String pour éviter les problèmes
    //    de session Hibernate dans les threads @Async ───────────────────────────

    public void sendMeetingCreatedEmail(String clientEmail, String clientName,
                                        String organizerName, String title, String dateStr) {
        log.info("[EMAIL] Envoi création réunion → {} (de={}, titre={})", clientEmail, fromEmail, title);
        String html = buildEventHtml("Nouvelle réunion planifiée",
                clientName, organizerName, title, dateStr,
                "Une nouvelle réunion a été planifiée avec vous.",
                "#6c63ff");
        trySend(clientEmail, "Nouvelle réunion planifiée - " + title, html);
    }

    public void sendMeetingUpdatedEmail(String clientEmail, String clientName,
                                        String organizerName, String title, String dateStr) {
        log.info("[EMAIL] Envoi modification réunion → {}", clientEmail);
        String html = buildEventHtml("Réunion modifiée",
                clientName, organizerName, title, dateStr,
                "Votre réunion a été modifiée. Voici les nouveaux détails :",
                "#f59e0b");
        trySend(clientEmail, "Réunion modifiée - " + title, html);
    }

    public void sendMeetingCancelledEmail(String clientEmail, String clientName,
                                          String organizerName, String title, String dateStr) {
        log.info("[EMAIL] Envoi annulation réunion → {}", clientEmail);
        String html = buildEventHtml("Réunion annulée",
                clientName, organizerName, title, dateStr,
                "Votre réunion a été annulée par le freelancer.",
                "#ef4444");
        trySend(clientEmail, "Réunion annulée - " + title, html);
    }

    // ── Envoi SMTP ────────────────────────────────────────────────────────────

    private void trySend(String to, String subject, String html) {
        try {
            log.info("[SMTP] Tentative envoi → {} | from={} | host=smtp.gmail.com:587", to, fromEmail);
            MimeMessage msg = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(msg, true, "UTF-8");
            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(html, true);
            mailSender.send(msg);
            log.info("[SMTP] ✅ Email envoyé avec succès → {}", to);
        } catch (Exception e) {
            Throwable cause = e.getCause() != null ? e.getCause() : e;
            log.error("[SMTP] ❌ ÉCHEC envoi → {} | type={} | message={} | cause={}",
                    to, e.getClass().getSimpleName(), e.getMessage(),
                    cause.getMessage(), e);
        }
    }

    private void trySendWithIcs(String to, String subject, String html,
                                 String icsContent, String meetingTitle) {
        try {
            MimeMessage msg = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(msg, true, "UTF-8");
            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(html, true);
            helper.addAttachment(
                sanitizeFilename(meetingTitle) + ".ics",
                () -> new java.io.ByteArrayInputStream(
                        icsContent.getBytes(java.nio.charset.StandardCharsets.UTF_8)),
                "text/calendar"
            );
            mailSender.send(msg);
            log.info("[SMTP] Reminder email envoyé → {}", to);
        } catch (Exception e) {
            log.error("[SMTP] ÉCHEC reminder email → {} | Erreur : {}", to, e.getMessage(), e);
        }
    }

    // ── Templates HTML ────────────────────────────────────────────────────────

    private String buildEventHtml(String heading, String clientName, String freelancerName,
                                  String title, String dateStr, String intro, String color) {
        return """
            <!DOCTYPE html>
            <html lang="fr">
            <head><meta charset="UTF-8"/></head>
            <body style="font-family:Arial,sans-serif;background:#f4f4f4;padding:20px;margin:0">
              <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;
                          overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.1)">
                <div style="background:%s;padding:32px;text-align:center">
                  <h1 style="color:#fff;margin:0;font-size:22px">%s</h1>
                </div>
                <div style="padding:32px">
                  <p style="font-size:16px;color:#333">Bonjour <strong>%s</strong>,</p>
                  <p style="color:#555;margin-bottom:20px">%s</p>
                  <div style="background:#f8f7ff;border-left:4px solid %s;
                              padding:16px;border-radius:6px">
                    <p style="margin:0 0 6px;font-size:18px;font-weight:bold;color:#333">%s</p>
                    <p style="margin:4px 0;color:#555">📅 Date : <strong>%s</strong></p>
                    <p style="margin:4px 0;color:#555">👤 Freelancer : <strong>%s</strong></p>
                  </div>
                  <p style="color:#999;font-size:12px;margin-top:28px;text-align:center">
                    Le lien de la réunion vous sera envoyé 15 minutes avant le début.
                  </p>
                </div>
                <div style="background:#f4f4f4;padding:16px;text-align:center">
                  <p style="color:#aaa;font-size:11px;margin:0">Marketplace — Réunions automatisées</p>
                </div>
              </div>
            </body>
            </html>
            """.formatted(color, heading, clientName, intro, color, title, dateStr, freelancerName);
    }

    private String buildReminderHtml(String recipientName, String otherName,
                                     String title, String dateStr,
                                     String meetingUrl, String label) {
        return """
            <!DOCTYPE html>
            <html lang="fr">
            <head><meta charset="UTF-8"/></head>
            <body style="font-family:Arial,sans-serif;background:#f4f4f4;padding:20px;margin:0">
              <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;
                          overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.1)">
                <div style="background:linear-gradient(135deg,#6c63ff,#4f46e5);
                            padding:32px;text-align:center">
                  <h1 style="color:#fff;margin:0;font-size:24px">📅 Rappel de réunion</h1>
                  <p style="color:rgba(255,255,255,.85);margin:8px 0 0">%s</p>
                </div>
                <div style="padding:32px">
                  <p style="font-size:16px;color:#333">Bonjour <strong>%s</strong>,</p>
                  <p style="color:#555">Vous avez une réunion <strong>%s</strong>
                     avec <strong>%s</strong>.</p>
                  <div style="background:#f8f7ff;border-left:4px solid #6c63ff;
                              padding:16px;border-radius:6px;margin:20px 0">
                    <p style="margin:0;font-size:18px;font-weight:bold;color:#333">%s</p>
                    <p style="margin:8px 0 0;color:#6c63ff;font-size:16px">🕐 %s</p>
                  </div>
                  <div style="text-align:center;margin:28px 0">
                    <a href="%s" style="background:#6c63ff;color:#fff;padding:14px 32px;
                       border-radius:25px;text-decoration:none;font-size:16px;
                       font-weight:bold;display:inline-block">
                      🚀 Rejoindre la réunion
                    </a>
                  </div>
                </div>
                <div style="background:#f4f4f4;padding:16px;text-align:center">
                  <p style="color:#aaa;font-size:11px;margin:0">Marketplace — Réunions automatisées</p>
                </div>
              </div>
            </body>
            </html>
            """.formatted(label, recipientName, label.toLowerCase(), otherName,
                          title, dateStr, meetingUrl);
    }

    private static String sanitizeFilename(String s) {
        return s == null ? "reunion" : s.replaceAll("[^a-zA-Z0-9_\\-]", "_");
    }
}
