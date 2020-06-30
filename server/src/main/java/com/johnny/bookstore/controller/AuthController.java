package com.johnny.bookstore.controller;

import java.net.URI;
import java.util.Collections;

import javax.validation.Valid;

import com.johnny.bookstore.exception.AppException;
import com.johnny.bookstore.model.Role;
import com.johnny.bookstore.model.RoleName;
import com.johnny.bookstore.model.User;
import com.johnny.bookstore.payload.request.Login;
import com.johnny.bookstore.payload.request.Signup;
import com.johnny.bookstore.payload.response.ApiResponse;
import com.johnny.bookstore.payload.response.JwtAuthentication;
import com.johnny.bookstore.repository.RoleRepository;
import com.johnny.bookstore.repository.UserRepository;
import com.johnny.bookstore.security.JwtTokenProvider;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtTokenProvider tokenProvider;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody Signup signupRequest) {
        if (userRepository.existsByUsername(signupRequest.getUsername())) {
            return new ResponseEntity<>(new ApiResponse(false, "Username already exists!"), HttpStatus.BAD_REQUEST);
        } else if (userRepository.existsByEmail(signupRequest.getEmail())) {
            return new ResponseEntity<>(new ApiResponse(false, "Email already exists"), HttpStatus.BAD_REQUEST);
        }
        
        User user = new User(signupRequest.getName(), signupRequest.getUsername(), signupRequest.getEmail(), signupRequest.getPassword());
        user.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
        Role userRole = roleRepository.findByName(RoleName.ROLE_USER).orElseThrow(() -> new AppException("User Role not set."));
        user.setRoles(Collections.singleton(userRole));
        User result = userRepository.save(user);

        URI location = ServletUriComponentsBuilder 
                        .fromCurrentContextPath().path("/users/{username}")
                        .buildAndExpand(result.getUsername()).toUri();
        return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody Login loginRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsernameOrEmail(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new JwtAuthentication(jwt));
    }
}