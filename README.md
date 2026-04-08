# AI Job Web App - Frontend

This project is the frontend for the AI Job Web App, a platform for connecting job seekers and recruiters, with AI-powered resume screening.

## Project Structure

```
frontend/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── Dashboard/
│   │   ├── jobSeekerDashboard/
│   │   │   ├── index.jsx
│   │   │   └── styles.module.scss
│   │   └── requirterDashboard/
│   │       ├── index.jsx
│   │       └── styles.module.scss
│   ├── assets/
│   │   ├── css/
│   │   │   └── global.styles.scss
│   │   ├── images/
│   │   │   └── index.js
│   │   ├── websiteImage/
│   │   │   └── index.jsx
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── components/
│   │   └── common/
│   │       ├── navbar/
│   │       │   ├── index.jsx
│   │       │   └── styles.module.scss
│   │       └── sidebar/
│   │           ├── index.jsx
│   │           └── styles.module.scss
│   ├── constants/
│   │   └── menus.js
│   ├── context/
│   │   └── auth.jsx
│   ├── dummy/
│   │   └── creds.js
│   ├── pages/
│   │   ├── jobSeekerPages/
│   │   │   ├── applications.jsx
│   │   │   ├── home.jsx
│   │   │   ├── jobs.jsx
│   │   │   └── profile.jsx
│   │   ├── requirterPage/
│   │   │   ├── candidates.jsx
│   │   │   ├── company.jsx
│   │   │   ├── home.jsx
│   │   │   └── postJob.jsx
│   │   ├── dashboard.jsx
│   │   ├── login.jsx
│   │   ├── recruiter.jsx
│   │   └── signup.jsx
│   ├── routes/
│   │   ├── ProtectedRoute.jsx
│   │   └── index.jsx
│   ├── services/
│   │   └── index.js
│   ├── utilitiy/
│   │   └── index.js
│   ├── websiteComponents/
│   │   ├── about/
│   │   │   ├── index.jsx
│   │   │   └── styles.module.scss
│   │   ├── feature/
│   │   │   ├── index.jsx
│   │   │   └── styles.module.scss
│   │   ├── footer/
│   │   │   └── index.jsx
│   │   ├── navbar/
│   │   │   ├── index.jsx
│   │   │   └── styles.module.scss
│   │   └── testimonial/
│   │       ├── index.jsx
│   │       └── styles.module.scss
│   ├── websitePages/
│   │   └── mainPage.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── task/
│   ├── MVP1-foundation-landing-page.todo
│   ├── MVP2-auth-system.todo
│   ├── MVP3-user-dashboard.todo
│   ├── MVP4-recruiter-dashboard.todo
│   ├── MVP5-ai-resume-screening.todo
│   ├── MVP6-api-integration-costs.todo
│   ├── MVP7-documentation-deployment.todo
│   ├── README-PROJECT-OVERVIEW.todo
│   └── TECH-STACK.todo
├── .gitignore
├── .nvmrc
├── README.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
└── vite.config.js
```

## Data Flow Diagrams (DFDs)

The Data Flow Diagrams (DFDs) for this project can be found in the `frontend requirment` directory. These diagrams illustrate the flow of data through the system.

### DFD Level 0 (Context Diagram)

![DFD Level 0](frontend%20requirment/DFD-Level0-Context.png)

### DFD Level 1 (Processes)

![DFD Level 1](frontend%20requirment/DFD-Level1-Processes.png)

### System Architecture Flow

![System Architecture](frontend%20requirment/System-Architecture-Flow.png)

### User Flow (Job Seeker)

![Job Seeker Flow](frontend%20requirment/UserFlow-JobSeeker-Journey.png)

### User Flow (Recruiter)

![Recruiter Flow](frontend%20requirment/UserFlow-Recruiter-Journey.png)
