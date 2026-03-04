package tn.esprit.pi.dto;

import lombok.Data;

@Data
public class CreateMessageRequest {
    private Long projectId;
    private Long senderId;
    private Long receiverId; // null for broadcast to all project members
    private String content;
    private String attachmentUrl;
    private String attachmentName;
}
