package com.careertrack.backend;

import org.springframework.data.jpa.repository.JpaRepository;

public interface InternshipApplicationRepository extends JpaRepository<InternshipApplication, Long> {
}