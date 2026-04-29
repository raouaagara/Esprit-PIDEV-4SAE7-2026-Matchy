package com.marketplace.repository;

import com.marketplace.entity.PrivateChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PrivateChatMessageRepository extends JpaRepository<PrivateChatMessage, Long> {

    List<PrivateChatMessage> findByRoomKeyOrderBySentAtAsc(String roomKey);

    java.util.Optional<PrivateChatMessage> findFirstByRoomKeyOrderBySentAtDesc(String roomKey);

    long countByRoomKeyAndReceiverIdAndReadFalse(String roomKey, Long receiverId);

    @Query("SELECT DISTINCT m.roomKey FROM PrivateChatMessage m WHERE m.sender.id = :userId OR m.receiver.id = :userId")
    List<String> findRoomKeysByUserId(@Param("userId") Long userId);

    @Query("SELECT m FROM PrivateChatMessage m WHERE m.roomKey = :roomKey AND m.receiver.id = :userId AND m.read = false")
    List<PrivateChatMessage> findUnreadMessages(@Param("roomKey") String roomKey, @Param("userId") Long userId);
}
