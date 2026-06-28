package com.careertrack.backend;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class InternshipApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String company;
    private String role;
    private String status;
    private String location;
    private String deadline;
    private String notes;

    public InternshipApplication() {
    }

    public InternshipApplication(String company, String role, String status, String location, String deadline, String notes) {
        this.company = company;
        this.role = role;
        this.status = status;
        this.location = location;
        this.deadline = deadline;
        this.notes = notes;
    }

    public Long getId() {
        return id;
    }

    public String getCompany() {
        return company;
    }

    public String getRole() {
        return role;
    }

    public String getStatus() {
        return status;
    }

    public String getLocation() {
        return location;
    }

    public String getDeadline() {
        return deadline;
    }

    public String getNotes() {
        return notes;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setDeadline(String deadline) {
        this.deadline = deadline;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}