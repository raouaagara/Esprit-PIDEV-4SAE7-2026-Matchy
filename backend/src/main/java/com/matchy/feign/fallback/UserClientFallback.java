package com.matchy.feign.fallback;

import com.matchy.entity.User;
import com.matchy.feign.UserClient;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;

@Slf4j
@Component
public class UserClientFallback implements UserClient {

    @Override
    public User getUserById(Long id) {
        log.warn("Fallback déclenché pour getUserById - id: {}", id);
        return null;
    }

    @Override
    public List<User> getAllUsers() {
        log.warn("Fallback déclenché pour getAllUsers");
        return Collections.emptyList();
    }

    @Override
    public User createUser(User user) {
        log.warn("Fallback déclenché pour createUser");
        return null;
    }

    @Override
    public void deleteUser(Long id) {
        log.warn("Fallback déclenché pour deleteUser - id: {}", id);
    }
}