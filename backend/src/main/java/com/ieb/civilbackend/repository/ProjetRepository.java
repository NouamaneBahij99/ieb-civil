package com.ieb.civilbackend.repository;

import com.ieb.civilbackend.model.Projet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjetRepository extends JpaRepository<Projet, Long> {
    Page<Projet> findByTitreContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
            String titre, String description, Pageable pageable);
}
