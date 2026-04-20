package com.ieb.civilbackend.repository;

import com.ieb.civilbackend.model.ServiceCivil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceRepository extends JpaRepository<ServiceCivil, Long> {
    Page<ServiceCivil> findByNomContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
            String nom, String description, Pageable pageable);
}
