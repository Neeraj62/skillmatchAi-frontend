# SkillMatch AI - Tech Stack & Deployment Guide

This document outlines the technologies used in the SkillMatch AI project, including both Frontend and Backend dependencies, as well as the deployment strategy.

## 🚀 Frontend Tech Stack

The frontend is built with **React 19** and **Vite**, focusing on a modern, responsive, and high-performance user experience.

### **Core Frameworks & Libraries**
- **React 19**: Modern UI library for building component-based interfaces.
- **Vite**: Next-generation frontend tooling for fast development and optimized builds.
- **React Router Dom (v7)**: Handles client-side routing and role-based navigation.
- **Axios**: Promise-based HTTP client for API requests to the backend.

### **UI & Styling**
- **SASS (SCSS)**: Powerful CSS extension for modular and maintainable styles.
- **Tailwind CSS (v4)**: Utility-first CSS framework for rapid UI development.
- **Framer Motion**: Production-ready motion library for React animations.
- **React Icons**: Comprehensive library for modern vector icons.
- **React Toastify**: Elegant notification system for user feedback.

### **Frontend Dependencies (package.json)**
```json
"dependencies": {
  "axios": "^1.14.0",
  "framer-motion": "^12.36.0",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "react-icons": "^5.5.0",
  "react-router-dom": "^7.13.1",
  "react-toastify": "^11.0.5"
}
```

---

## 🛠️ Backend Tech Stack

The backend is a **Node.js** and **Express** application designed with a modular architecture for scalability and clean separation of concerns.

### **Core Technologies**
- **Node.js**: JavaScript runtime environment.
- **Express (v5)**: Fast, unopinionated, minimalist web framework.
- **MongoDB & Mongoose**: NoSQL database with schema-based modeling.
- **JWT (JSON Web Tokens)**: Secure authentication and authorization mechanism.

### **File Handling & Cloud Storage**
- **Multer**: Middleware for handling `multipart/form-data` (file uploads).
- **Cloudinary**: Cloud-based image and video management service for avatars and resumes.
- **Multer Storage Cloudinary**: Integration between Multer and Cloudinary storage.

### **Documentation & Utilities**
- **Swagger (OpenAPI 3.0)**: Automatic API documentation and testing interface.
- **Bcrypt**: Library for secure password hashing.
- **EJS**: Embedded JavaScript templates for server-side rendering (landing page).
- **Dotenv**: Manages environment variables securely.

### **Backend Dependencies (package.json)**
```json
"dependencies": {
  "bcrypt": "^6.0.0",
  "cloudinary": "^2.7.0",
  "cors": "^2.8.5",
  "dotenv": "^17.2.0",
  "ejs": "^5.0.1",
  "express": "^5.1.0",
  "jsonwebtoken": "^9.0.2",
  "mongoose": "^8.16.2",
  "multer": "^2.0.1",
  "multer-storage-cloudinary": "^4.0.0",
  "swagger-jsdoc": "^6.2.8",
  "swagger-ui-express": "^5.0.1"
}
```

---

## 🌐 Deployment Strategy

The project is designed to be deployed across multiple platforms for optimal performance and availability.

### **Hosting Platforms**
- **Frontend (Vercel)**:
  - Optimized for React/Vite applications.
  - Features automatic CI/CD from GitHub.
  - Global CDN for fast content delivery.
- **Backend (Render)**:
  - Robust platform for Node.js services.
  - Supports automatic deployments and health monitoring.
  - Scalable instances for handling API traffic.

### **Domain & Infrastructure**
- **Hostinger**:
  - Used for custom domain registration (`skillmatch-ai.com`).
  - Provides professional email hosting and DNS management.
- **MongoDB Atlas**:
  - Fully managed cloud database for production data.
- **Cloudinary**:
  - Handles all static assets (Profile pictures, Company logos, Resumes).

---

## 🔒 Security Measures
- **CORS Configuration**: Restricts API access to authorized origins.
- **Password Hashing**: Uses Bcrypt with high salt rounds.
- **Environment Variables**: Sensitive keys (API keys, DB URLs) are never committed to version control.
- **Role-Based Access Control (RBAC)**: Ensures users can only access endpoints relevant to their role (Candidate vs Recruiter).
