package com.careertrack.backend;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "http://localhost:5173")
public class InternshipApplicationController {

    private final InternshipApplicationRepository repository;

    public InternshipApplicationController(InternshipApplicationRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<InternshipApplication> getAllApplications() {
        return repository.findAll();
    }

    @PostMapping
    public InternshipApplication createApplication(@RequestBody InternshipApplication application) {
        return repository.save(application);
    }

    @PutMapping("/{id}")
    public ResponseEntity<InternshipApplication> updateApplication(
            @PathVariable Long id,
            @RequestBody InternshipApplication updatedApplication
    ) {
        return repository.findById(id)
                .map(application -> {
                    application.setCompany(updatedApplication.getCompany());
                    application.setRole(updatedApplication.getRole());
                    application.setStatus(updatedApplication.getStatus());
                    application.setLocation(updatedApplication.getLocation());
                    application.setDeadline(updatedApplication.getDeadline());
                    application.setNotes(updatedApplication.getNotes());

                    InternshipApplication savedApplication = repository.save(application);
                    return ResponseEntity.ok(savedApplication);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApplication(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}