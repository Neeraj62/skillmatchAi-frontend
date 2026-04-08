# 🚀 Hostinger VPS Deployment — Complete Step-by-Step Guide

> **Overview:** This folder contains everything needed to deploy the SkillMatch AI platform (Backend + Frontend) on a Hostinger VPS using Docker, Nginx, SSL, and automated CI/CD via GitHub Actions.

---

## 📁 Files Created for Deployment

```
skillmatch-ai-backend/
├── Dockerfile                    ← Multi-stage Docker build (Node 20 Alpine)
├── .dockerignore                 ← Excludes docs, node_modules, .env from image
├── docker-compose.prod.yml       ← Orchestrates all services
├── nginx/
│   └── nginx.conf                ← Reverse proxy + SSL + rate limiting
└── .github/
    └── workflows/
        └── deploy.yml            ← CI/CD: auto-deploy on push to main
```

---

## 📋 Table of Contents

1. [Purchase & Access VPS](#step-1--purchase--access-hostinger-vps)
2. [Initial Server Setup](#step-2--initial-server-setup-first-time-only)
3. [Install Docker & Docker Compose](#step-3--install-docker--docker-compose)
4. [Clone Project to VPS](#step-4--clone-project-to-vps)
5. [Configure Environment Variables](#step-5--configure-environment-variables)
6. [Setup SSL Certificate](#step-6--setup-ssl-certificate-lets-encrypt)
7. [Update Nginx Configuration](#step-7--update-nginx-with-your-domain)
8. [Build & Launch with Docker](#step-8--build--launch-with-docker-compose)
9. [Verify Deployment](#step-9--verify-deployment)
10. [Setup CI/CD Automation](#step-10--setup-cicd-with-github-actions)
11. [Monitoring & Maintenance](#step-11--monitoring--maintenance)
12. [Troubleshooting](#step-12--troubleshooting)

---

## Step 1 — Purchase & Access Hostinger VPS

### 1.1 Purchase VPS on Hostinger

1. Go to [hostinger.in/vps-hosting](https://www.hostinger.in/vps-hosting)
2. Choose a plan:
   - **Recommended for SkillMatch AI:** KVM 2 (2 vCPU, 8 GB RAM, 100 GB SSD) — ~₹459/month
   - **Minimum:** KVM 1 (1 vCPU, 4 GB RAM, 50 GB SSD) — ~₹289/month
3. Select **Ubuntu 22.04 or 24.04** as the operating system
4. Set a **root password** (save it securely!)
5. Complete purchase → VPS will be ready in ~2 minutes

### 1.2 Find Your VPS IP

1. Login to [hpanel.hostinger.com](https://hpanel.hostinger.com)
2. Go to **VPS** → Click your VPS → Note the **IP Address**
3. Example: `185.210.144.XXX`

### 1.3 Connect via SSH (from your local machine)

```bash
# Windows (PowerShell or CMD)
ssh root@185.210.144.XXX

# First time: type "yes" when asked about fingerprint
# Enter your root password
```

> **Tip:** Use [PuTTY](https://www.putty.org) on Windows or the built-in terminal on Mac/Linux.

---

## Step 2 — Initial Server Setup (First Time Only)

Run these commands **as root** after first SSH login:

```bash
# ─── 2.1 Update system packages ───
apt update && apt upgrade -y

# ─── 2.2 Set timezone to India ───
timedatectl set-timezone Asia/Kolkata

# ─── 2.3 Create a non-root deploy user ───
adduser skillmatch
# Enter a password when prompted, press Enter for other fields

# ─── 2.4 Give sudo access to the new user ───
usermod -aG sudo skillmatch

# ─── 2.5 Setup SSH key authentication (more secure than password) ───
# On your LOCAL machine, generate SSH key:
# ssh-keygen -t ed25519 -C "skillmatch-vps"
# (Save to default location, optionally add passphrase)

# Copy your public key to VPS:
# ssh-copy-id skillmatch@185.210.144.XXX

# ─── 2.6 Setup firewall ───
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
# Type "y" to confirm

# ─── 2.7 Verify firewall ───
ufw status
# Output should show: 22/tcp, 80/tcp, 443/tcp ALLOW
```

### 2.8 Disable Root Login (Security)

```bash
nano /etc/ssh/sshd_config
```
Find and change:
```
PermitRootLogin no
PasswordAuthentication no   # Only if SSH keys are set up
```
Restart SSH:
```bash
systemctl restart sshd
```

> ⚠️ **IMPORTANT:** Test SSH login with your new user in a NEW terminal before disabling root!

---

## Step 3 — Install Docker & Docker Compose

```bash
# Login as skillmatch user
ssh skillmatch@185.210.144.XXX

# ─── 3.1 Install Docker ───
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# ─── 3.2 Add user to docker group (no need for sudo) ───
sudo usermod -aG docker $USER

# ─── 3.3 Apply group change (logout and login again) ───
exit
ssh skillmatch@185.210.144.XXX

# ─── 3.4 Verify Docker ───
docker --version
# Output: Docker version 27.x.x

docker compose version
# Output: Docker Compose version v2.x.x

# ─── 3.5 Test Docker ───
docker run hello-world
# Should print: "Hello from Docker!"
```

---

## Step 4 — Clone Project to VPS

```bash
# ─── 4.1 Create project directory ───
mkdir -p /home/skillmatch/app
cd /home/skillmatch/app

# ─── 4.2 Clone your repository ───
git clone https://github.com/Ashukr321/Ai-job-web-app.git .
# The "." clones into the current directory

# ─── 4.3 Navigate to backend ───
cd skillmatch-ai-backend

# ─── 4.4 Verify files are present ───
ls -la
# Should see: Dockerfile, docker-compose.prod.yml, app.js, src/, nginx/, etc.
```

### Using SSH Key for Private Repos (if needed)

```bash
# On VPS: generate a deploy key
ssh-keygen -t ed25519 -C "vps-deploy-key" -f ~/.ssh/deploy_key -N ""

# Copy the public key
cat ~/.ssh/deploy_key.pub

# On GitHub: Repo → Settings → Deploy Keys → Add deploy key → Paste public key
# Then clone with SSH:
git clone git@github.com:Ashukr321/Ai-job-web-app.git .
```

---

## Step 5 — Configure Environment Variables

```bash
# ─── 5.1 Create .env file ───
cd /home/skillmatch/app/skillmatch-ai-backend
nano .env
```

Paste the following (replace with your actual values):

```bash
# ─── App ───
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://yourdomain.com

# ─── Database (MongoDB Atlas) ───
MONGODB_URI=mongodb+srv://youruser:yourpass@cluster0.xxxxx.mongodb.net/skillmatch-ai?retryWrites=true&w=majority

# ─── Auth ───
JWT_SECRET=your_super_long_random_jwt_secret_key_here_make_it_64chars
JWT_EXPIRE=7d

# ─── Redis (internal Docker container) ───
REDIS_URL=redis://:skillmatch_redis_2026@redis:6379
REDIS_PASSWORD=skillmatch_redis_2026

# ─── OpenAI ───
OPENAI_API_KEY=sk-proj-...
OPENAI_MODEL=gpt-4o-mini
AI_MONTHLY_BUDGET_INR=2500

# ─── Cloudinary ───
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# ─── Email (Nodemailer SMTP) ───
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=noreply@yourdomain.com
SMTP_PASS=your_email_password
EMAIL_FROM=noreply@yourdomain.com
```

Save: `Ctrl + O`, `Enter`, `Ctrl + X`

> 🔒 **Security:** Never commit `.env` to Git. It's already in `.gitignore`.

### 5.2 Generate a Secure JWT Secret

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
# Copy the output and use it as JWT_SECRET
```

---

## Step 6 — Setup SSL Certificate (Let's Encrypt)

### 6.1 Point Your Domain to VPS

1. Go to your domain registrar (Hostinger / GoDaddy / Namecheap)
2. Add **DNS A Records**:

| Type | Name | Value (Your VPS IP) | TTL |
|------|------|---------------------|-----|
| A | `@` | `185.210.144.XXX` | 3600 |
| A | `www` | `185.210.144.XXX` | 3600 |
| A | `api` | `185.210.144.XXX` | 3600 |

3. Wait 5-30 minutes for DNS propagation
4. Verify: `ping yourdomain.com` → should show your VPS IP

### 6.2 Get Initial SSL Certificate

First, create a temporary Nginx for the ACME challenge:

```bash
cd /home/skillmatch/app/skillmatch-ai-backend

# Create certbot directories
mkdir -p certbot/www certbot/conf

# Start a temporary Nginx for SSL verification
docker run -d --name temp-nginx \
  -p 80:80 \
  -v $(pwd)/certbot/www:/var/www/certbot \
  nginx:alpine

# Get SSL certificate
docker run --rm \
  -v $(pwd)/certbot/www:/var/www/certbot \
  -v $(pwd)/certbot/conf:/etc/letsencrypt \
  certbot/certbot certonly \
  --webroot -w /var/www/certbot \
  -d yourdomain.com -d www.yourdomain.com \
  --email your-email@gmail.com \
  --agree-tos --no-eff-email

# Stop temporary Nginx
docker stop temp-nginx && docker rm temp-nginx
```

**Expected output:** "Successfully received certificate."

> **Certificates stored at:** `certbot/conf/live/yourdomain.com/`

---

## Step 7 — Update Nginx with Your Domain

```bash
nano nginx/nginx.conf
```

Replace **all** instances of `yourdomain.com` with your actual domain:

```
# Find and replace:
yourdomain.com → skillmatch-ai.com   (or whatever your domain is)
```

Save: `Ctrl + O`, `Enter`, `Ctrl + X`

---

## Step 8 — Build & Launch with Docker Compose

```bash
cd /home/skillmatch/app/skillmatch-ai-backend

# ─── 8.1 Build and start all services ───
docker compose -f docker-compose.prod.yml up -d --build

# ─── 8.2 Watch the build logs ───
docker compose -f docker-compose.prod.yml logs -f

# Wait until you see:
# skillmatch-backend  | Server is running on port 5000
# skillmatch-backend  | Successfully Connected to Database

# Press Ctrl+C to exit log view (containers keep running)

# ─── 8.3 Check all containers are running ───
docker ps

# Expected output:
# CONTAINER ID   IMAGE                  STATUS           NAMES
# abc123         skillmatch-backend     Up 2 minutes     skillmatch-backend
# def456         skillmatch-frontend    Up 2 minutes     skillmatch-frontend
# ghi789         nginx:alpine           Up 2 minutes     skillmatch-nginx
# jkl012         redis:7-alpine         Up 2 minutes     skillmatch-redis
# mno345         certbot/certbot        Up 2 minutes     skillmatch-certbot
```

---

## Step 9 — Verify Deployment

### 9.1 Check Backend Health

```bash
# From VPS
curl http://localhost:5000/api/health
# Expected: {"status":"ok","uptime":...}

# From your browser
https://yourdomain.com/api/health
# Expected: {"status":"ok"}
```

### 9.2 Check Frontend

```bash
# Open in browser
https://yourdomain.com
# Should show the SkillMatch AI landing page
```

### 9.3 Check SSL Certificate

```bash
# Open in browser: look for 🔒 padlock icon
https://yourdomain.com

# Or verify from terminal
curl -vI https://yourdomain.com 2>&1 | grep "SSL certificate"
```

### 9.4 Check API Docs

```bash
https://yourdomain.com/api-docs
# Should show Swagger UI
```

---

## Step 10 — Setup CI/CD with GitHub Actions

### 10.1 Generate SSH Key for GitHub

```bash
# On your LOCAL machine
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_deploy -N ""

# Copy the PRIVATE key (for GitHub Secrets)
cat ~/.ssh/github_deploy

# Copy the PUBLIC key (for VPS)
cat ~/.ssh/github_deploy.pub
```

### 10.2 Add Public Key to VPS

```bash
# SSH into VPS
ssh skillmatch@185.210.144.XXX

# Add the public key
echo "PASTE_YOUR_PUBLIC_KEY_HERE" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

### 10.3 Add Secrets to GitHub Repository

Go to: **GitHub Repo → Settings → Secrets and variables → Actions → New repository secret**

| Secret Name | Value |
|-------------|-------|
| `VPS_HOST` | `185.210.144.XXX` (your VPS IP) |
| `VPS_USERNAME` | `skillmatch` |
| `VPS_SSH_KEY` | Contents of `~/.ssh/github_deploy` (PRIVATE key) |
| `VPS_PORT` | `22` |

### 10.4 How CI/CD Works

```
Developer pushes to main branch
    │
    ├── GitHub Actions triggers deploy.yml
    │   ├── Step 1: Run tests
    │   ├── Step 2: SSH into VPS
    │   ├── Step 3: git pull origin main
    │   ├── Step 4: docker compose down
    │   ├── Step 5: docker compose up -d --build
    │   ├── Step 6: docker image prune -f
    │   └── Step 7: Health check → ✅ or ❌ rollback
    │
    └── Result: Automatic zero-downtime deployment
```

### 10.5 Test CI/CD

```bash
# On your local machine
git add .
git commit -m "feat: add Docker deployment configuration"
git push origin main

# Go to GitHub → Actions tab → Watch the workflow run
```

---

## Step 11 — Monitoring & Maintenance

### 11.1 View Logs

```bash
# All services
docker compose -f docker-compose.prod.yml logs -f

# Specific service
docker compose -f docker-compose.prod.yml logs -f backend
docker compose -f docker-compose.prod.yml logs -f nginx
docker compose -f docker-compose.prod.yml logs -f redis

# Last 100 lines
docker compose -f docker-compose.prod.yml logs --tail=100 backend
```

### 11.2 Restart Services

```bash
# Restart all
docker compose -f docker-compose.prod.yml restart

# Restart single service
docker compose -f docker-compose.prod.yml restart backend

# Full rebuild (after code changes)
docker compose -f docker-compose.prod.yml up -d --build backend
```

### 11.3 Monitor Resources

```bash
# Docker container stats
docker stats

# Disk usage
df -h

# Memory usage
free -m

# CPU & processes
htop  # (install: sudo apt install htop)
```

### 11.4 SSL Certificate Auto-Renewal

The Certbot container **automatically renews** certificates every 12 hours. To verify:

```bash
# Check certificate expiry
docker compose -f docker-compose.prod.yml exec certbot certbot certificates

# Manual renewal test (dry run)
docker compose -f docker-compose.prod.yml exec certbot certbot renew --dry-run
```

### 11.5 Setup Uptime Monitoring

1. Go to [UptimeRobot.com](https://uptimerobot.com) (free)
2. Add monitors:
   - **HTTP(s)**: `https://yourdomain.com` — check every 5 min
   - **HTTP(s)**: `https://yourdomain.com/api/health` — check every 5 min
3. Set email/Telegram alerts on downtime

### 11.6 Database Backup (MongoDB Atlas)

MongoDB Atlas handles automatic backups. For extra safety:

```bash
# Manual backup from VPS
mongodump --uri="mongodb+srv://user:pass@cluster.mongodb.net/skillmatch-ai" --out=/home/skillmatch/backups/$(date +%Y%m%d)

# Setup daily backup cron
crontab -e
# Add: 0 2 * * * mongodump --uri="your_uri" --out=/home/skillmatch/backups/$(date +\%Y\%m\%d) && find /home/skillmatch/backups -mtime +7 -delete
```

---

## Step 12 — Troubleshooting

### Container Keeps Restarting

```bash
# Check logs for error
docker compose -f docker-compose.prod.yml logs --tail=50 backend

# Common causes:
# 1. Missing .env file → create it (Step 5)
# 2. MongoDB connection failed → check MONGODB_URI
# 3. Port already in use → stop conflicting service
```

### 502 Bad Gateway (Nginx)

```bash
# Backend container not running
docker ps | grep backend
# If not listed, check logs:
docker compose -f docker-compose.prod.yml logs backend
```

### SSL Certificate Error

```bash
# Certificate not found
ls certbot/conf/live/
# If empty, re-run Step 6.2

# Certificate expired
docker compose -f docker-compose.prod.yml exec certbot certbot renew
docker compose -f docker-compose.prod.yml restart nginx
```

### Out of Disk Space

```bash
# Clean Docker
docker system prune -af --volumes

# Check large files
du -sh /home/skillmatch/app/*
```

### Rollback to Previous Version

```bash
cd /home/skillmatch/app/skillmatch-ai-backend

# See recent commits
git log --oneline -5

# Rollback to specific commit
git checkout <commit-hash>

# Rebuild
docker compose -f docker-compose.prod.yml up -d --build
```

---

## 📊 Architecture Overview

```
                         Internet
                            │
                     ┌──────┴──────┐
                     │   DNS (A)   │
                     │ yourdomain  │
                     │  → VPS IP   │
                     └──────┬──────┘
                            │
                  ┌─────────┴─────────┐
                  │  Hostinger VPS    │
                  │  Ubuntu 22.04    │
                  │                   │
                  │  ┌─── Docker ──┐ │
                  │  │             │ │
                  │  │   Nginx     │ │  ← Port 80/443 (public)
                  │  │  :80/:443  │ │
                  │  │   │    │    │ │
                  │  │   │    │    │ │
                  │  │   ▼    ▼    │ │
                  │  │ Frontend Backend│
                  │  │  :3000   :5000 │ ← Internal only (not exposed)
                  │  │           │    │ │
                  │  │           ▼    │ │
                  │  │         Redis  │ │
                  │  │         :6379  │ │ ← Internal only
                  │  │             │ │
                  │  └─────────────┘ │
                  │                   │
                  └───────────────────┘
                            │
                     ┌──────┴──────┐
                     │ MongoDB     │
                     │ Atlas       │
                     │ (Cloud DB)  │
                     └─────────────┘
```

---

## ⚡ Quick Command Reference

| Action | Command |
|--------|---------|
| Start all | `docker compose -f docker-compose.prod.yml up -d` |
| Stop all | `docker compose -f docker-compose.prod.yml down` |
| Rebuild & start | `docker compose -f docker-compose.prod.yml up -d --build` |
| View logs | `docker compose -f docker-compose.prod.yml logs -f` |
| Backend logs | `docker compose -f docker-compose.prod.yml logs -f backend` |
| Restart backend | `docker compose -f docker-compose.prod.yml restart backend` |
| Enter backend shell | `docker exec -it skillmatch-backend sh` |
| Check container status | `docker ps` |
| Clean old images | `docker image prune -f` |
| Full cleanup | `docker system prune -af` |
| Renew SSL | `docker compose -f docker-compose.prod.yml exec certbot certbot renew` |
