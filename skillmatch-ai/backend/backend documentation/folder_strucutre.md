 
# Folder Structure of SkillMatch AI Backend

```
├── 📁 backend
│   ├── 📁 documentation
│   │   ├── 📝 backend-tech-stack.md
│   │   └── 📝 folder_strucutre.md
│   ├── 📁 project-requirement
│   │   ├── 📁 _01_skillmatch_ai_data_model
│   │   │   ├── 📝 00_data_model_overview.md
│   │   │   ├── 📝 01_user.md
│   │   │   ├── 📝 02_candidate_profile.md
│   │   │   ├── 📝 03_recruiter_profile.md
│   │   │   ├── 📝 04_candidate_skill.md
│   │   │   ├── 📝 05_candidate_education.md
│   │   │   ├── 📝 06_candidate_experience.md
│   │   │   ├── 📝 07_resume.md
│   │   │   ├── 📝 08_job.md
│   │   │   ├── 📝 09_application.md
│   │   │   ├── 📝 10_notification.md
│   │   │   ├── 📝 11_skill.md
│   │   │   └── 📝 12_ai_usage_log.md
│   │   ├── 📁 _02_skillmatch_ai_api_list
│   │   │   ├── 📝 00_api_overview.md
│   │   │   ├── 📝 01_auth_apis.md
│   │   │   ├── 📝 02_user_profile_apis.md
│   │   │   ├── 📝 03_resume_apis.md
│   │   │   ├── 📝 04_job_public_apis.md
│   │   │   ├── 📝 05_job_application_apis.md
│   │   │   ├── 📝 06_recruiter_profile_apis.md
│   │   │   ├── 📝 07_recruiter_job_apis.md
│   │   │   ├── 📝 08_recruiter_applicant_apis.md
│   │   │   ├── 📝 09_notification_apis.md
│   │   │   └── 📝 10_ai_admin_apis.md
│   │   ├── 📁 _03_skillmatch_ai_backend_middleware
│   │   │   ├── 📝 00_middleware_overview.md
│   │   │   ├── 📝 01_cors.md
│   │   │   ├── 📝 02_helmet.md
│   │   │   ├── 📝 03_rate_limiter.md
│   │   │   ├── 📝 04_auth_middleware.md
│   │   │   ├── 📝 05_role_guard.md
│   │   │   ├── 📝 06_input_validation.md
│   │   │   ├── 📝 07_file_upload.md
│   │   │   ├── 📝 08_error_handler.md
│   │   │   └── 📝 09_remaining_middleware.md
│   │   ├── 📁 _04_skillmatch_ai_implementation_steps
│   │   │   ├── 📝 00_implementation_overview.md
│   │   │   ├── 📝 phase_01_project_setup.md
│   │   │   ├── 📝 phase_02_auth_system.md
│   │   │   ├── 📝 phase_03_user_dashboard_backend.md
│   │   │   ├── 📝 phase_04_recruiter_dashboard_backend.md
│   │   │   ├── 📝 phase_05_ai_engine.md
│   │   │   ├── 📝 phase_06_integrations.md
│   │   │   └── 📝 phase_07_testing_deployment.md
│   │   ├── 📁 _05_hostinger_vps_deployment_steps
│   │   │   └── 📝 00_complete_deployment_guide.md
│   │   └── 📁 dfd- SKILL MATCH AI
│   │       ├── 📄 DFD-Level0-Context.drawio
│   │       ├── 🖼️ DFD-Level0-Context.png
│   │       ├── 📄 DFD-Level1-Processes.drawio
│   │       ├── 🖼️ DFD-Level1-Processes.png
│   │       ├── 📄 System-Architecture-Flow.drawio
│   │       ├── 🖼️ System-Architecture-Flow.png
│   │       ├── 📄 UserFlow-JobSeeker-Journey.drawio
│   │       ├── 🖼️ UserFlow-JobSeeker-Journey.png
│   │       ├── 📄 UserFlow-Recruiter-Journey.drawio
│   │       └── 🖼️ UserFlow-Recruiter-Journey.png
│   ├── 📁 src
│   │   ├── 📁 config
│   │   │   ├── 📄 cloudinary.js
│   │   │   ├── 📄 connectDb.js
│   │   │   ├── 📄 envConfig.js
│   │   │   └── 📄 swagger.js
│   │   ├── 📁 middlewares
│   │   │   ├── 📄 authMiddleware.js
│   │   │   └── 📄 globalErrorHandler.js
│   │   ├── 📁 modules
│   │   │   ├── 📁 ai-usage-log
│   │   │   │   ├── 📄 ai-usage-log.controller.js
│   │   │   │   ├── 📄 ai-usage-log.model.js
│   │   │   │   ├── 📄 ai-usage-log.routes.js
│   │   │   │   └── 📄 ai-usage-log.swagger.js
│   │   │   ├── 📁 application
│   │   │   │   ├── 📄 application.controller.js
│   │   │   │   ├── 📄 application.model.js
│   │   │   │   ├── 📄 application.routes.js
│   │   │   │   └── 📄 application.swagger.js
│   │   │   ├── 📁 auth
│   │   │   │   ├── 📄 auth.controller.js
│   │   │   │   ├── 📄 auth.routes.js
│   │   │   │   ├── 📄 auth.swagger.js
│   │   │   │   └── 📄 auth.validator.js
│   │   │   ├── 📁 candidate-education
│   │   │   │   ├── 📄 candidate-education.controller.js
│   │   │   │   ├── 📄 candidate-education.model.js
│   │   │   │   ├── 📄 candidate-education.routes.js
│   │   │   │   └── 📄 candidate-education.swagger.js
│   │   │   ├── 📁 candidate-experience
│   │   │   │   ├── 📄 candidate-experience.controller.js
│   │   │   │   ├── 📄 candidate-experience.model.js
│   │   │   │   ├── 📄 candidate-experience.routes.js
│   │   │   │   └── 📄 candidate-experience.swagger.js
│   │   │   ├── 📁 candidate-profile
│   │   │   │   ├── 📄 candidate-profile.controller.js
│   │   │   │   ├── 📄 candidate-profile.model.js
│   │   │   │   ├── 📄 candidate-profile.routes.js
│   │   │   │   └── 📄 candidate-profile.swagger.js
│   │   │   ├── 📁 candidate-skill
│   │   │   │   ├── 📄 candidate-skill.controller.js
│   │   │   │   ├── 📄 candidate-skill.model.js
│   │   │   │   ├── 📄 candidate-skill.routes.js
│   │   │   │   └── 📄 candidate-skill.swagger.js
│   │   │   ├── 📁 job
│   │   │   │   ├── 📄 job.controller.js
│   │   │   │   ├── 📄 job.model.js
│   │   │   │   ├── 📄 job.routes.js
│   │   │   │   └── 📄 job.swagger.js
│   │   │   ├── 📁 notification
│   │   │   │   ├── 📄 notification.controller.js
│   │   │   │   ├── 📄 notification.model.js
│   │   │   │   ├── 📄 notification.routes.js
│   │   │   │   └── 📄 notification.swagger.js
│   │   │   ├── 📁 recruiter-profile
│   │   │   │   ├── 📄 recruiter-profile.controller.js
│   │   │   │   ├── 📄 recruiter-profile.model.js
│   │   │   │   ├── 📄 recruiter-profile.routes.js
│   │   │   │   └── 📄 recruiter-profile.swagger.js
│   │   │   ├── 📁 resume
│   │   │   │   ├── 📄 resume.controller.js
│   │   │   │   ├── 📄 resume.model.js
│   │   │   │   ├── 📄 resume.routes.js
│   │   │   │   └── 📄 resume.swagger.js
│   │   │   ├── 📁 skill
│   │   │   │   ├── 📄 skill.controller.js
│   │   │   │   ├── 📄 skill.model.js
│   │   │   │   ├── 📄 skill.routes.js
│   │   │   │   └── 📄 skill.swagger.js
│   │   │   └── 📁 user
│   │   │       ├── 📄 user.controller.js
│   │   │       ├── 📄 user.model.js
│   │   │       ├── 📄 user.routes.js
│   │   │       └── 📄 user.swagger.js
│   │   ├── 📁 utils
│   │   │   ├── 📄 ApiError.js
│   │   │   ├── 📄 ApiResponse.js
│   │   │   ├── 📄 asyncHandler.js
│   │   │   ├── 📄 cloudinary.js
│   │   │   └── 📄 generateTokens.js
│   │   ├── 📁 views
│   │   │   └── 📁 pages
│   │   │       └── 📄 landing.ejs
│   │   └── 📄 index.js
│   ├── 📁 uploads
│   ├── ⚙️ .gitignore
│   ├── ⚙️ .nvmrc
│   ├── 📝 API_ROUTES_LIST.md
│   ├── 📝 README.md
│   ├── 📝 SAMPLE_TEST_DATA.md
│   ├── 📄 app.js
│   ├── ⚙️ package-lock.json
│   └── ⚙️ package.json
```
