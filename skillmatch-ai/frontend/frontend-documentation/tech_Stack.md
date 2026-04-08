# 🚀 Frontend Tech Stack Documentation

This document provides a detailed overview of the frontend technologies used in the **SkillMatch AI** project. Each component is chosen for its performance, developer experience, and scalability.

---

### **Core Frameworks & Libraries**

#### **React 19**
React 19 is the latest version of the popular JavaScript library for building user interfaces. It introduces several performance improvements and new features like improved server components support, better concurrent rendering capabilities, and simplified state management through new hooks. Its component-based architecture allows for building complex, reusable UIs that are efficient and easy to maintain.

#### **Vite**
Vite is a build tool that significantly improves the frontend development experience. It leverages native ES modules in the browser to provide near-instant server start and extremely fast Hot Module Replacement (HMR). During production builds, it uses Rollup for highly optimized output, ensuring that the application loads quickly and performs well for end-users, making it a modern alternative to older tools like Webpack.

#### **React Router Dom (v7)**
React Router Dom version 7 is a powerful library for handling navigation and routing in React applications. It allows for defining complex route structures, including nested routes, dynamic parameters, and protected routes based on user roles. The latest version brings enhanced performance, improved data fetching patterns, and a more intuitive API for managing the application's URL and view synchronization.

#### **Axios**
Axios is a popular, promise-based HTTP client that simplifies the process of making asynchronous requests to backend APIs. It provides a clean and consistent API for handling GET, POST, and other HTTP methods, along with built-in support for request and response interceptors, automatic JSON data transformation, and robust error handling. This makes it an essential tool for managing data flow between the frontend and the server.

---

### **UI & Styling**

#### **SASS (SCSS)**
SASS (Syntactically Awesome Style Sheets) is a preprocessor scripting language that is interpreted or compiled into Cascading Style Sheets (CSS). The SCSS syntax provides advanced features like variables, nesting, mixins, and inheritance, which help in writing more modular, organized, and maintainable styles. It bridges the gap between traditional CSS and modern development needs, making large-scale styling much more manageable.

#### **Tailwind CSS (v4)**
Tailwind CSS v4 is a utility-first CSS framework that allows developers to build modern designs directly in their markup without leaving their HTML or JSX files. It provides a vast set of low-level utility classes for everything from spacing and colors to typography and layout. The latest version introduces even faster build times, improved performance, and a more streamlined configuration process, enabling rapid prototyping and consistent styling.

#### **Framer Motion**
Framer Motion is a production-ready motion library for React that makes it incredibly easy to add high-quality animations and gestures to web applications. It provides a declarative API for defining animations, transitions, and complex interactions, ensuring smooth performance and a polished user experience. Its features like layout animations and exit animations help in creating truly immersive and interactive frontend interfaces.

#### **React Icons**
React Icons is a comprehensive library that provides a unified way to include icons from various popular icon sets like Font Awesome, Material Design, and Ionicons into React projects. By using ES6 imports, it ensures that only the icons actually used in the application are included in the final bundle, helping to keep the application lightweight while providing access to thousands of high-quality vector icons.

#### **React Toastify**
React Toastify is an elegant and highly customizable notification system for React applications. It allows developers to easily add toast notifications (pop-up alerts) for providing user feedback, such as success messages, error warnings, or informational updates. With features like auto-close, progress bars, and custom styling options, it enhances the overall user experience by providing clear and non-intrusive feedback.

---

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
