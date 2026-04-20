package com.ieb.civilbackend.controller;

import com.ieb.civilbackend.model.Projet;
import com.ieb.civilbackend.model.ServiceCivil;
import com.ieb.civilbackend.model.Message;
import com.ieb.civilbackend.repository.ProjetRepository;
import com.ieb.civilbackend.repository.ServiceRepository;
import com.ieb.civilbackend.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private static final String UPLOAD_DIR = "uploads/";

    private final ProjetRepository projetRepo;
    private final ServiceRepository serviceRepo;
    private final MessageRepository messageRepo;

    // ── Projets ──────────────────────────────────────────────

    @GetMapping("/projets")
    public List<Projet> listerProjets() {
        return projetRepo.findAll();
    }

    @PostMapping("/projets")
    public ResponseEntity<?> creerProjet(
            @RequestParam("titre") String titre,
            @RequestParam("description") String description,
            @RequestParam(value = "image", required = false) MultipartFile image) {

        Projet projet = new Projet();
        projet.setTitre(titre);
        projet.setDescription(description);

        if (image != null && !image.isEmpty()) {
            try {
                String filename = saveImage(image);
                projet.setImagePath("/uploads/" + filename);
            } catch (IOException e) {
                return ResponseEntity.internalServerError()
                        .body(Map.of("error", "Erreur upload image: " + e.getMessage()));
            }
        }

        return ResponseEntity.ok(projetRepo.save(projet));
    }

    @PutMapping("/projets/{id}")
    public ResponseEntity<?> modifierProjet(
            @PathVariable Long id,
            @RequestParam("titre") String titre,
            @RequestParam("description") String description,
            @RequestParam(value = "image", required = false) MultipartFile image) {

        return projetRepo.findById(id).map(projet -> {
            projet.setTitre(titre);
            projet.setDescription(description);

            if (image != null && !image.isEmpty()) {
                try {
                    // Supprimer l'ancienne image
                    deleteOldImage(projet.getImagePath());
                    String filename = saveImage(image);
                    projet.setImagePath("/uploads/" + filename);
                } catch (IOException e) {
                    return ResponseEntity.internalServerError()
                            .body(Map.of("error", "Erreur upload image: " + e.getMessage()));
                }
            }
            return ResponseEntity.ok(projetRepo.save(projet));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/projets/{id}")
    public ResponseEntity<?> supprimerProjet(@PathVariable Long id) {
        return projetRepo.findById(id).map(projet -> {
            deleteOldImage(projet.getImagePath());
            projetRepo.delete(projet);
            return ResponseEntity.ok(Map.of("message", "Projet supprimé"));
        }).orElse(ResponseEntity.notFound().build());
    }

    // ── Services ─────────────────────────────────────────────

    @GetMapping("/services")
    public List<ServiceCivil> listerServices() {
        return serviceRepo.findAll();
    }

    @PostMapping("/services")
    public ServiceCivil creerService(@RequestBody ServiceCivil service) {
        return serviceRepo.save(service);
    }
    @PutMapping("/services/{id}")
    public ResponseEntity<?> modifierService(@PathVariable Long id, @RequestBody ServiceCivil service) {
        return serviceRepo.findById(id).map(s -> {
            s.setNom(service.getNom());
            s.setDescription(service.getDescription());
            return ResponseEntity.ok(serviceRepo.save(s));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/services/{id}")
    public ResponseEntity<?> supprimerService(@PathVariable Long id) {
        serviceRepo.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Service supprimé"));
    }

    // ── Messages ─────────────────────────────────────────────

    @GetMapping("/messages")
    public List<Message> consulterMessages() {
        return messageRepo.findAll();
    }

    @DeleteMapping("/messages/{id}")
    public ResponseEntity<?> supprimerMessage(@PathVariable Long id) {
        messageRepo.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Message supprimé"));
    }

    // ── Helpers ──────────────────────────────────────────────

    private String saveImage(MultipartFile file) throws IOException {
        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            throw new IOException("Type de fichier non accepté");
        }

        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String extension = getExtension(file.getOriginalFilename());
        String filename = UUID.randomUUID() + "." + extension;
        Files.copy(file.getInputStream(),
                uploadPath.resolve(filename),
                StandardCopyOption.REPLACE_EXISTING);
        return filename;
    }

    private void deleteOldImage(String imagePath) {
        if (imagePath == null || imagePath.isEmpty()) return;
        try {
            String filename = imagePath.replace("/uploads/", "");
            Path path = Paths.get(UPLOAD_DIR + filename);
            Files.deleteIfExists(path);
        } catch (IOException ignored) {}
    }

    private String getExtension(String filename) {
        if (filename == null || !filename.contains(".")) return "jpg";
        return filename.substring(filename.lastIndexOf(".") + 1).toLowerCase();
    }
}