package com.ieb.civilbackend.controller;

import com.ieb.civilbackend.model.Role;
import com.ieb.civilbackend.model.User;
import com.ieb.civilbackend.repository.UserRepository;
import com.ieb.civilbackend.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authManager;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        System.out.println(">>> Login attempt for: " + body.get("username"));
        try {
            authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            body.get("username"),
                            body.get("password")
                    )
            );
        } catch (Exception e) {
            System.err.println(">>> Auth error: " + e.getClass().getName() + " - " + e.getMessage());
            return ResponseEntity.status(401).body(Map.of("error", e.getMessage()));
        }
        var user = userRepository.findByUsername(body.get("username")).orElseThrow();
        var token = jwtService.generateToken(user);
        return ResponseEntity.ok(Map.of("token", token, "role", user.getRole()));
    }

    @PostMapping("/register-admin")
    public ResponseEntity<?> registerAdmin(@RequestBody Map<String, String> body) {
        System.out.println(">>> Register admin: " + body.get("username"));
        if (userRepository.findByUsername(body.get("username")).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("error", "User already exists"));
        }
        var user = new User();
        user.setUsername(body.get("username"));
        user.setPassword(passwordEncoder.encode(body.get("password")));
        user.setRole(Role.ROLE_ADMIN);
        userRepository.save(user);
        return ResponseEntity.ok(Map.of("message", "Admin créé"));
    }
}