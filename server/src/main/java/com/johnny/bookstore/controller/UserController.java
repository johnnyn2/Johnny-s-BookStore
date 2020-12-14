package com.johnny.bookstore.controller;

import javax.servlet.http.HttpServletRequest;

import com.johnny.bookstore.exception.AppException;
import com.johnny.bookstore.model.User;
import com.johnny.bookstore.payload.response.UserIdentityAvailability;
import com.johnny.bookstore.payload.response.UserSummary;
import com.johnny.bookstore.repository.UserRepository;
import com.johnny.bookstore.security.JwtTokenProvider;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenProvider provider;
    
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @GetMapping("/user/checkUsernameAvailability")
    public UserIdentityAvailability checkUsernameAvailability(@RequestParam(value = "username") String username) {
        Boolean isAvailable = !userRepository.existsByUsername(username);
        return new UserIdentityAvailability(isAvailable);
    }

    @GetMapping("/user/checkEmailAvailability")
    public UserIdentityAvailability checkEmailAvailability(@RequestParam(value = "email") String email) {
        Boolean isAvailable = !userRepository.existsByEmail(email);
        return new UserIdentityAvailability(isAvailable);
    }

    @GetMapping("/user/me")
    public ResponseEntity<?> getCurrentUser(HttpServletRequest request) {
        String token = getJwtTokenFromRequest(request);
        if (StringUtils.hasText(token) && provider.validateToken(token)) {
            Long id = provider.getUserIdFromJWT(token);
            User currentUser = userRepository.findById(id).orElseThrow(() -> new AppException("User not found with id"));
            UserSummary userSummary = new UserSummary(currentUser.getId(), currentUser.getUsername(), currentUser.getName());
            return ResponseEntity.ok(userSummary);
        }
        return ResponseEntity.notFound().build();
    }

    private String getJwtTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7, bearerToken.length());
        }
        return null;
    }
}