# Backend Tech Stack - SkillMatch AI

This document provides a detailed breakdown of the backend technologies used in the SkillMatch AI project. Each technology is selected to ensure scalability, security, and high performance for an AI-driven recruitment platform.

### **Node.js**
Node.js serves as the core runtime environment for our backend. It is an open-source, cross-platform JavaScript runtime built on Chrome's V8 engine. We chose Node.js because its non-blocking, event-driven I/O model makes it lightweight and efficient, which is perfect for data-intensive real-time applications like our AI matching system. It allows us to handle thousands of concurrent connections with minimal overhead, ensuring that the SkillMatch AI platform remains responsive even during peak usage periods.

### **Express.js**
Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. In this project, Express acts as the routing layer, managing all API endpoints and middleware integration. Its unopinionated nature allows us to structure our modules exactly how we need them, facilitating a clean and scalable modular architecture. By using Express, we can easily implement complex logic for job applications, profile management, and AI interactions while maintaining high code readability and performance.

### **MongoDB & Mongoose**
MongoDB is our primary NoSQL database, chosen for its flexibility and ability to handle unstructured data like resumes and job descriptions. Unlike traditional relational databases, MongoDB stores data in JSON-like documents, which aligns perfectly with our JavaScript-based tech stack. We use Mongoose as an Object Data Modeling (ODM) library to manage our data schemas. Mongoose provides a straight-forward, schema-based solution to model our application data, including built-in type casting, validation, and query building, ensuring data integrity across the platform.

### **Bcrypt**
Security is a top priority for SkillMatch AI, which is why we use Bcrypt for sensitive data protection. Bcrypt is a password-hashing function designed by Niels Provos and David Mazières, based on the Blowfish cipher. It incorporates a salt to protect against rainbow table attacks and is intentionally slow to resist brute-force search attacks. By using Bcrypt, we ensure that user passwords are never stored in plain text and remain secure even in the event of a database breach, providing peace of mind to both candidates and recruiters.

### **JSON Web Token (JWT)**
For authentication and authorization, we rely on JSON Web Tokens. JWT is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. In our system, JWTs are used to verify the identity of users and control access to restricted routes based on roles (Candidate vs. Recruiter). This stateless authentication mechanism allows us to scale our backend horizontally without the need for session storage, making the system more robust and easier to manage across different environments.

### **Cloudinary & Multer**
Handling file uploads like profile photos and resumes is managed through the combination of Multer and Cloudinary. Multer is a Node.js middleware for handling `multipart/form-data`, which is primarily used for uploading files. We integrate it with Cloudinary, a cloud-based image and video management service. This setup allows us to offload the storage and processing of heavy assets to a specialized global CDN. Cloudinary ensures that resumes are stored securely and profile pictures are automatically optimized for fast loading across all devices.

### **Swagger (OpenAPI 3.0)**
To maintain high-quality documentation and facilitate easy testing, we have integrated Swagger. Swagger is a suite of tools built around the OpenAPI Specification that helps us design, build, and document RESTful APIs. It provides an interactive UI that allows developers to explore and test every API endpoint directly from the browser. This ensures that our backend remains well-documented and easy to integrate with the frontend, significantly reducing development time and improving collaboration across the team.
