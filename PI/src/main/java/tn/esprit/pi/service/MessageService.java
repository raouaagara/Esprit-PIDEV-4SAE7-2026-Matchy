package tn.esprit.pi.service;

import tn.esprit.pi.entity.Message;
import tn.esprit.pi.entity.Project;
import tn.esprit.pi.entity.User;
import tn.esprit.pi.repository.MessageRepository;
import tn.esprit.pi.repository.ProjectRepository;
import tn.esprit.pi.repository.UserRepository;
import tn.esprit.pi.dto.MessageDTO;
import tn.esprit.pi.dto.CreateMessageRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MessageService {
    
    private final MessageRepository messageRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;
    
    @Transactional
    public MessageDTO sendMessage(CreateMessageRequest request) {
        Project project = projectRepository.findById(request.getProjectId())
                .orElseThrow(() -> new RuntimeException("Project not found"));
        
        User sender = userRepository.findById(request.getSenderId())
                .orElseThrow(() -> new RuntimeException("Sender not found"));
        
        User receiver = null;
        if (request.getReceiverId() != null) {
            receiver = userRepository.findById(request.getReceiverId())
                    .orElseThrow(() -> new RuntimeException("Receiver not found"));
        }
        
        Message message = new Message();
        message.setProject(project);
        message.setSender(sender);
        message.setReceiver(receiver);
        message.setContent(request.getContent());
        message.setAttachmentUrl(request.getAttachmentUrl());
        message.setAttachmentName(request.getAttachmentName());
        message.setIsRead(false);
        
        Message saved = messageRepository.save(message);
        
        // Send notification to receiver
        if (receiver != null) {
            notificationService.createNotification(
                receiver,
                "New Message",
                sender.getFirstName() + " " + sender.getLastName() + " sent you a message about " + project.getTitle(),
                tn.esprit.pi.entity.Notification.NotificationType.MESSAGE_RECEIVED,
                saved.getId()
            );
        }
        
        return convertToDTO(saved);
    }
    
    public List<MessageDTO> getProjectMessages(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        
        return messageRepository.findByProjectOrderByCreatedAtAsc(project)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<MessageDTO> getChatThread(Long projectId, Long userId) {
        return messageRepository.findChatThread(projectId, userId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public void markAsRead(Long messageId) {
        Message message = messageRepository.findById(messageId)
                .orElseThrow(() -> new RuntimeException("Message not found"));
        message.setIsRead(true);
        messageRepository.save(message);
    }
    
    @Transactional
    public void markThreadAsRead(Long projectId, Long userId) {
        List<Message> messages = messageRepository.findChatThread(projectId, userId);
        messages.forEach(m -> {
            if (m.getReceiver() != null && m.getReceiver().getId().equals(userId)) {
                m.setIsRead(true);
            }
        });
        messageRepository.saveAll(messages);
    }
    
    public Long getUnreadCount(Long userId) {
        return messageRepository.countUnreadMessages(userId);
    }
    
    private MessageDTO convertToDTO(Message message) {
        MessageDTO dto = new MessageDTO();
        dto.setId(message.getId());
        dto.setProjectId(message.getProject().getId());
        dto.setProjectTitle(message.getProject().getTitle());
        dto.setSenderId(message.getSender().getId());
        dto.setSenderName(message.getSender().getFirstName() + " " + message.getSender().getLastName());
        
        if (message.getReceiver() != null) {
            dto.setReceiverId(message.getReceiver().getId());
            dto.setReceiverName(message.getReceiver().getFirstName() + " " + message.getReceiver().getLastName());
        }
        
        dto.setContent(message.getContent());
        dto.setAttachmentUrl(message.getAttachmentUrl());
        dto.setAttachmentName(message.getAttachmentName());
        dto.setIsRead(message.getIsRead());
        dto.setCreatedAt(message.getCreatedAt());
        
        return dto;
    }
}
