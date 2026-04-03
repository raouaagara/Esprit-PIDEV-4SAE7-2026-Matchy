package com.matchy.feign;

import com.matchy.entity.User;
import com.matchy.feign.fallback.UserClientFallback;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "user-service", fallback = UserClientFallback.class)
public interface UserClient {

    @GetMapping("/api/users/{id}")
    User getUserById(@PathVariable("id") Long id);

    @GetMapping("/api/users")
    List<User> getAllUsers();

    @PostMapping("/api/users")
    User createUser(@RequestBody User user);

    @DeleteMapping("/api/users/{id}")
    void deleteUser(@PathVariable("id") Long id);
}