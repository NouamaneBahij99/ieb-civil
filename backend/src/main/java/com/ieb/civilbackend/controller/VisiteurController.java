package com.ieb.civilbackend.controller;

import com.ieb.civilbackend.model.Projet;
import com.ieb.civilbackend.model.ServiceCivil;
import com.ieb.civilbackend.model.Message;
import com.ieb.civilbackend.repository.ProjetRepository;
import com.ieb.civilbackend.repository.ServiceRepository;
import com.ieb.civilbackend.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/public")
@RequiredArgsConstructor
public class VisiteurController {

    private final ProjetRepository projetRepo;
    private final ServiceRepository serviceRepo;
    private final MessageRepository messageRepo;

    @GetMapping("/projets")
    public Page<Projet> consulterProjets(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size,
            @RequestParam(defaultValue = "") String search) {
        Pageable pageable = PageRequest.of(page, size);
        if (!search.isEmpty()) {
            return projetRepo.findByTitreContainingIgnoreCaseOrDescriptionContainingIgnoreCase(search, search, pageable);
        }
        return projetRepo.findAll(pageable);
    }

    @GetMapping("/services")
    public Page<ServiceCivil> consulterServices(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size,
            @RequestParam(defaultValue = "") String search) {
        Pageable pageable = PageRequest.of(page, size);
        if (!search.isEmpty()) {
            return serviceRepo.findByNomContainingIgnoreCaseOrDescriptionContainingIgnoreCase(search, search, pageable);
        }
        return serviceRepo.findAll(pageable);
    }

    @PostMapping("/message")
    public Message envoyerMessage(@RequestBody Message message) {
        return messageRepo.save(message);
    }
}
