CareerTrack - Internship Application Tracker

CareerTrack is a full-stack internship application tracker built to help students organize internship applications, deadlines, assessment stages, interview progress, and notes in one dashboard.

This project was created as a practical full-stack portfolio project using a React frontend and Java Spring Boot backend.

Features

- Add new internship applications
- View all saved applications
- Update application status
- Delete applications
- Search applications by company, role, or location
- Filter applications by status
- Track totals for applied roles, assessments, interviews, and offers
- Store data through a backend REST API

Tech Stack

Frontend

- React
- Vite
- JavaScript
- CSS

Backend

- Java
- Spring Boot
- Spring Web
- Spring Data JPA
- H2 in-memory database

Tools

- Git
- GitHub
- npm
- Maven Wrapper

Project Structure

careertrack-internship-tracker/
├── frontend/
│   └── React dashboard
├── backend/
│   └── Spring Boot REST API
├── docs/
│   └── project notes and screenshots
├── .github/
│   └── workflows
└── README.md

API Endpoints

Method| Endpoint| Description
GET| "/api/applications"| Get all applications
POST| "/api/applications"| Create a new application
PUT| "/api/applications/{id}"| Update an application
DELETE| "/api/applications/{id}"| Delete an application

How to Run the Project

1. Run the Backend

cd backend
mvnw.cmd spring-boot:run

The backend will run on:

http://localhost:8080

API test URL:

http://localhost:8080/api/applications

2. Run the Frontend

Open a second terminal:

cd frontend
npm install
npm run dev

The frontend will run on:

http://localhost:5173

Current Status

The project currently includes a working React frontend connected to a Java Spring Boot backend. Data is stored using an H2 in-memory database for development and testing.

Future Improvements

- Add PostgreSQL database support
- Add user authentication
- Add deadline reminders
- Add company priority levels
- Add interview notes and preparation checklist
- Add GitHub Actions for automated build testing
- Deploy frontend and backend online

Purpose

This project was built to practice full-stack development, REST API integration, frontend state management, backend data handling, and professional GitHub project organization.