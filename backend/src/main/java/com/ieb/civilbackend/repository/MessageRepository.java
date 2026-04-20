package com.ieb.civilbackend.repository;

import com.ieb.civilbackend.model.Message; // BIEN VÉRIFIER CET IMPORT
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
// Le premier paramètre DOIT être Message pour le MessageRepository
public interface MessageRepository extends JpaRepository<Message, Long> {
}