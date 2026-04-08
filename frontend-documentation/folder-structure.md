

#  Frontend Folder Structure
```
├── 📁 frontend
│   ├── 📁 frontend requirment
│   │   ├── 📄 DFD-Level0-Context.drawio
│   │   ├── 🖼️ DFD-Level0-Context.png
│   │   ├── 📄 DFD-Level1-Processes.drawio
│   │   ├── 🖼️ DFD-Level1-Processes.png
│   │   ├── 📄 System-Architecture-Flow.drawio
│   │   ├── 🖼️ System-Architecture-Flow.png
│   │   ├── 📄 UserFlow-JobSeeker-Journey.drawio
│   │   ├── 🖼️ UserFlow-JobSeeker-Journey.png
│   │   ├── 📄 UserFlow-Recruiter-Journey.drawio
│   │   └── 🖼️ UserFlow-Recruiter-Journey.png
│   ├── 📁 frontend-documentation
│   │   └── 📝 folder-structure.md
│   ├── 📁 public
│   │   ├── 🖼️ favicon.svg
│   │   └── 🖼️ icons.svg
│   ├── 📁 src
│   │   ├── 📁 Dashboard
│   │   │   ├── 📁 jobSeekerDashboard
│   │   │   │   ├── 📄 index.jsx
│   │   │   │   └── 🎨 styles.module.scss
│   │   │   └── 📁 requirterDashboard
│   │   │       ├── 📄 index.jsx
│   │   │       └── 🎨 styles.module.scss
│   │   ├── 📁 assets
│   │   │   ├── 📁 css
│   │   │   │   ├── 📁 components
│   │   │   │   └── 🎨 global.styles.scss
│   │   │   ├── 📁 font
│   │   │   ├── 📁 images
│   │   │   │   ├── 📁 logo
│   │   │   │   ├── 📁 teams
│   │   │   │   │   └── 🖼️ neeraj.jpeg
│   │   │   │   └── 📄 index.js
│   │   │   ├── 📁 websiteImage
│   │   │   │   └── 📄 index.jsx
│   │   │   ├── 🖼️ hero.png
│   │   │   ├── 🖼️ react.svg
│   │   │   └── 🖼️ vite.svg
│   │   ├── 📁 components
│   │   │   ├── 📁 common
│   │   │   │   ├── 📁 navbar
│   │   │   │   │   ├── 📄 index.jsx
│   │   │   │   │   └── 🎨 styles.module.scss
│   │   │   │   └── 📁 sidebar
│   │   │   │       ├── 📄 index.jsx
│   │   │   │       └── 🎨 styles.module.scss
│   │   │   └── 📁 pureComponent
│   │   ├── 📁 constants
│   │   │   └── 📄 menus.js
│   │   ├── 📁 context
│   │   │   ├── 📄 auth.jsx
│   │   │   └── 📄 theme.jsx
│   │   ├── 📁 pages
│   │   │   ├── 📁 jobSeekerPages
│   │   │   │   ├── 📄 applications.jsx
│   │   │   │   ├── 🎨 dashboard.module.scss
│   │   │   │   ├── 📄 home.jsx
│   │   │   │   ├── 📄 jobs.jsx
│   │   │   │   └── 📄 profile.jsx
│   │   │   ├── 📁 requirterPage
│   │   │   │   ├── 📄 candidates.jsx
│   │   │   │   ├── 📄 company.jsx
│   │   │   │   ├── 🎨 dashboard.module.scss
│   │   │   │   ├── 📄 home.jsx
│   │   │   │   └── 📄 postJob.jsx
│   │   │   ├── 🎨 auth.module.scss
│   │   │   ├── 📄 dashboard.jsx
│   │   │   ├── 📄 forgot-password.jsx
│   │   │   ├── 📄 login.jsx
│   │   │   ├── 📄 recruiter.jsx
│   │   │   └── 📄 signup.jsx
│   │   ├── 📁 routes
│   │   │   ├── 📄 ProtectedRoute.jsx
│   │   │   └── 📄 index.jsx
│   │   ├── 📁 services
│   │   │   └── 📄 index.js
│   │   ├── 📁 shared
│   │   ├── 📁 utilitiy
│   │   │   └── 📄 index.js
│   │   ├── 📁 websiteComponents
│   │   │   ├── 📁 about
│   │   │   │   ├── 📄 index.jsx
│   │   │   │   └── 🎨 styles.module.scss
│   │   │   ├── 📁 faq
│   │   │   │   ├── 📄 index.jsx
│   │   │   │   └── 🎨 styles.module.scss
│   │   │   ├── 📁 feature
│   │   │   │   ├── 📄 index.jsx
│   │   │   │   └── 🎨 styles.module.scss
│   │   │   ├── 📁 footer
│   │   │   │   ├── 📄 index.jsx
│   │   │   │   └── 🎨 styles.module.scss
│   │   │   ├── 📁 hero
│   │   │   │   ├── 📄 index.jsx
│   │   │   │   └── 🎨 styles.module.scss
│   │   │   ├── 📁 navbar
│   │   │   │   ├── 📄 index.jsx
│   │   │   │   └── 🎨 styles.module.scss
│   │   │   ├── 📁 team
│   │   │   │   ├── 📄 index.jsx
│   │   │   │   └── 🎨 styles.module.scss
│   │   │   └── 📁 testimonial
│   │   │       ├── 📄 index.jsx
│   │   │       └── 🎨 styles.module.scss
│   │   ├── 📁 websitePages
│   │   │   ├── 📄 contactPage.jsx
│   │   │   ├── 🎨 contactPage.module.scss
│   │   │   └── 📄 mainPage.jsx
│   │   ├── 🎨 App.css
│   │   ├── 📄 App.jsx
│   │   ├── 🎨 index.css
│   │   └── 📄 main.jsx
│   ├── 📁 task
│   │   ├── 📄 MVP1-foundation-landing-page.todo
│   │   ├── 📄 MVP2-auth-system.todo
│   │   ├── 📄 MVP3-user-dashboard.todo
│   │   ├── 📄 MVP4-recruiter-dashboard.todo
│   │   ├── 📄 MVP5-ai-resume-screening.todo
│   │   ├── 📄 MVP6-api-integration-costs.todo
│   │   ├── 📄 MVP7-documentation-deployment.todo
│   │   ├── 📄 README-PROJECT-OVERVIEW.todo
│   │   └── 📄 TECH-STACK.todo
│   ├── ⚙️ .gitignore
│   ├── ⚙️ .nvmrc
│   ├── 📝 README.md
│   ├── 📄 eslint.config.js
│   ├── 🌐 index.html
│   ├── ⚙️ package-lock.json
│   ├── ⚙️ package.json
│   └── 📄 vite.config.js
```