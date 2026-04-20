package com.ieb.civilbackend.repository;

import com.ieb.civilbackend.model.Projet;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
class ProjetRepositoryTest {

    @Autowired
    private ProjetRepository projetRepository;

    @Test
    @DisplayName("Doit sauvegarder un projet")
    void shouldSaveProjet() {
        Projet p = new Projet();
        p.setTitre("Route Nationale Test");
        p.setDescription("Construction test");
        Projet saved = projetRepository.save(p);
        assertThat(saved.getId()).isNotNull();
        assertThat(saved.getTitre()).isEqualTo("Route Nationale Test");
    }

    @Test
    @DisplayName("Doit trouver les projets par titre")
    void shouldSearchByTitre() {
        Projet p = new Projet();
        p.setTitre("Pont Autoroutier Rabat");
        p.setDescription("Construction pont");
        projetRepository.save(p);

        var result = projetRepository
            .findByTitreContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
                "Pont", "Pont",
                org.springframework.data.domain.PageRequest.of(0, 10));

        assertThat(result.getContent()).isNotEmpty();
    }
}
