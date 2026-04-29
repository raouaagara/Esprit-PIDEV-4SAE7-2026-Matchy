package com.marketplace.repository;

import com.marketplace.entity.ChatMessage;
import com.marketplace.entity.MessageReaction;
import com.marketplace.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MessageReactionRepository extends JpaRepository<MessageReaction, Long> {
    List<MessageReaction> findByMessage(ChatMessage message);
    Optional<MessageReaction> findByMessageAndUser(ChatMessage message, User user);
    void deleteByMessage(ChatMessage message);
    void deleteByMessageAndUser(ChatMessage message, User user);
}
