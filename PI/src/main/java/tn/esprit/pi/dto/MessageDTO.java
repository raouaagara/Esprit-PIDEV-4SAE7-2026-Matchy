package tn.esprit.pi.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class MessageDTO {
    private Long id;
    private Long projectId;
    private String projectTitle;
    private Long senderId;
    private String senderName;
    private Long receiverId;
    private String receiverName;
    private String content;
    private String attachmentUrl;
    private String attachmentName;
    private Boolean isRead;
    private LocalDateTime createdAt;
}
