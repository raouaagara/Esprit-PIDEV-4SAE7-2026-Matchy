package com.marketplace.service;

import com.marketplace.dto.Dtos.*;
import com.marketplace.entity.PrivateChatMessage;
import com.marketplace.entity.User;
import com.marketplace.entity.UserOnlineStatus;
import com.marketplace.repository.PrivateChatMessageRepository;
import com.marketplace.repository.ProjectRepository;
import com.marketplace.repository.UserOnlineStatusRepository;
import com.marketplace.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class PrivateChatService {

    @Autowired private PrivateChatMessageRepository messageRepo;
    @Autowired private UserRepository userRepo;
    @Autowired private UserOnlineStatusRepository statusRepo;
    @Autowired private ProjectRepository projectRepo;

    public String buildRoomKey(Long clientId, Long freelancerId, Long projectId) {
        return "c" + clientId + "_f" + freelancerId + "_p" + projectId;
    }

    public List<ConversationSummary> getConversations(String userEmail) {
        User user = userRepo.findByEmail(userEmail).orElseThrow();
        List<String> roomKeys = messageRepo.findRoomKeysByUserId(user.getId());

        List<ConversationSummary> conversations = new ArrayList<>();

        for (String roomKey : roomKeys) {
            var lastOpt = messageRepo.findFirstByRoomKeyOrderBySentAtDesc(roomKey);
            if (lastOpt.isEmpty()) continue;

            PrivateChatMessage lastMsg = lastOpt.get();
            User otherUser = lastMsg.getSender().getId().equals(user.getId())
                    ? lastMsg.getReceiver() : lastMsg.getSender();

            String projectTitle = "";
            if (lastMsg.getProjectId() != null) {
                projectTitle = projectRepo.findById(lastMsg.getProjectId())
                        .map(p -> p.getTitle()).orElse("");
            }

            long unread = messageRepo.countByRoomKeyAndReceiverIdAndReadFalse(roomKey, user.getId());
            boolean otherOnline = statusRepo.findById(otherUser.getId())
                    .map(UserOnlineStatus::isOnline).orElse(false);

            ConversationSummary summary = new ConversationSummary();
            summary.setRoomKey(roomKey);
            summary.setOtherUserId(otherUser.getId());
            summary.setOtherUserName(otherUser.getName());
            summary.setProjectId(lastMsg.getProjectId());
            summary.setProjectTitle(projectTitle);
            summary.setLastMessage(lastMsg.getContent());
            summary.setLastMessageTime(lastMsg.getSentAt());
            summary.setUnreadCount(unread);
            summary.setOtherUserOnline(otherOnline);
            conversations.add(summary);
        }

        conversations.sort((a, b) -> {
            if (a.getLastMessageTime() == null) return 1;
            if (b.getLastMessageTime() == null) return -1;
            return b.getLastMessageTime().compareTo(a.getLastMessageTime());
        });

        return conversations;
    }

    public List<PrivateChatMessageResponse> getMessages(String roomKey, String userEmail) {
        List<PrivateChatMessage> messages = messageRepo.findByRoomKeyOrderBySentAtAsc(roomKey);
        return messages.stream().map(this::toResponse).toList();
    }

    @Transactional
    public PrivateChatMessageResponse sendMessage(PrivateChatMessageRequest req, String senderEmail) {
        User sender = userRepo.findByEmail(senderEmail).orElseThrow();
        User receiver = userRepo.findById(req.getReceiverId()).orElseThrow();

        PrivateChatMessage message = new PrivateChatMessage();
        message.setContent(req.getContent());
        message.setSender(sender);
        message.setReceiver(receiver);
        message.setProjectId(req.getProjectId());
        message.setRoomKey(req.getRoomKey());
        message.setSentAt(LocalDateTime.now());
        message.setRead(false);

        message = messageRepo.save(message);
        return toResponse(message);
    }

    @Transactional
    public void markRead(String roomKey, String userEmail) {
        User user = userRepo.findByEmail(userEmail).orElseThrow();
        List<PrivateChatMessage> unread = messageRepo.findUnreadMessages(roomKey, user.getId());
        for (PrivateChatMessage msg : unread) {
            msg.setRead(true);
            msg.setReadAt(LocalDateTime.now());
        }
        messageRepo.saveAll(unread);
    }

    public void updateOnlineStatus(Long userId, boolean online) {
        UserOnlineStatus status = statusRepo.findById(userId).orElse(new UserOnlineStatus());
        status.setUserId(userId);
        status.setOnline(online);
        status.setLastSeen(LocalDateTime.now());
        statusRepo.save(status);
    }

    public UserStatusResponse getOnlineStatus(Long userId) {
        UserOnlineStatus status = statusRepo.findById(userId).orElse(null);
        if (status == null) return new UserStatusResponse(userId, false, null);
        return new UserStatusResponse(userId, status.isOnline(), status.getLastSeen());
    }

    private PrivateChatMessageResponse toResponse(PrivateChatMessage msg) {
        PrivateChatMessageResponse r = new PrivateChatMessageResponse();
        r.setId(msg.getId());
        r.setContent(msg.getContent());
        r.setSenderId(msg.getSender().getId());
        r.setSenderName(msg.getSender().getName());
        r.setReceiverId(msg.getReceiver().getId());
        r.setReceiverName(msg.getReceiver().getName());
        r.setProjectId(msg.getProjectId());
        r.setRoomKey(msg.getRoomKey());
        r.setSentAt(msg.getSentAt());
        r.setRead(msg.isRead());
        return r;
    }
}
