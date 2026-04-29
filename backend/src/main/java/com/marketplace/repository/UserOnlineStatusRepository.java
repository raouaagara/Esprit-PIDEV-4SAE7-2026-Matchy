package com.marketplace.repository;

import com.marketplace.entity.UserOnlineStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserOnlineStatusRepository extends JpaRepository<UserOnlineStatus, Long> {
}
