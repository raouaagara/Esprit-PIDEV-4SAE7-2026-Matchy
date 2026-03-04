package tn.esprit.pi.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class NotificationDTO {
    private Long id;
    private Long userId;
    private String title;
    private String message;
    private String type;
    private Long referenceId;
    private Boolean isRead;
    private LocalDateTime createdAt;
}
