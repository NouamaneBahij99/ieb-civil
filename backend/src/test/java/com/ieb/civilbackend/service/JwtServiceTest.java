package com.ieb.civilbackend.service;

import com.ieb.civilbackend.model.Role;
import com.ieb.civilbackend.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.springframework.test.util.ReflectionTestUtils;

import static org.assertj.core.api.Assertions.assertThat;

class JwtServiceTest {

    private JwtService jwtService;
    private User testUser;

    @BeforeEach
    void setUp() {
        jwtService = new JwtService();
        ReflectionTestUtils.setField(jwtService, "secret",
            "VotreSecretTresLongEtSecurise1234567890AbCdEfGhIj");
        ReflectionTestUtils.setField(jwtService, "expiration", 86400000L);

        testUser = new User();
        testUser.setUsername("admin");
        testUser.setPassword("password");
        testUser.setRole(Role.ROLE_ADMIN);
    }

    @Test
    @DisplayName("Doit générer un token JWT valide")
    void shouldGenerateValidToken() {
        String token = jwtService.generateToken(testUser);
        assertThat(token).isNotNull().isNotEmpty();
    }

    @Test
    @DisplayName("Doit extraire le username du token")
    void shouldExtractUsername() {
        String token = jwtService.generateToken(testUser);
        String username = jwtService.extractUsername(token);
        assertThat(username).isEqualTo("admin");
    }

    @Test
    @DisplayName("Le token doit être valide pour le bon utilisateur")
    void shouldValidateTokenForCorrectUser() {
        String token = jwtService.generateToken(testUser);
        boolean isValid = jwtService.isTokenValid(token, testUser);
        assertThat(isValid).isTrue();
    }

    @Test
    @DisplayName("Le token ne doit pas être valide pour un autre utilisateur")
    void shouldNotValidateTokenForWrongUser() {
        String token = jwtService.generateToken(testUser);
        User otherUser = new User();
        otherUser.setUsername("autreuser");
        otherUser.setRole(Role.ROLE_USER);
        boolean isValid = jwtService.isTokenValid(token, otherUser);
        assertThat(isValid).isFalse();
    }
}
