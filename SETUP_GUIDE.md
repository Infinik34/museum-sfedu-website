# Setup Guide: Local Development Environment

## Prerequisites
- Node.js >= 18.x (LTS)
- npm or yarn
- Git

## 1. Clone Repository
```bash
git clone https://github.com/Infinik34/museum-sfedu-website.git
cd museum-sfedu-website

2. Install Dependencies
Backend (Strapi CMS)
cd museum-cms
npm install
Frontend (Next.js)
Return to root and enter frontend folder:
cd ..
cd "React NextJS museum"
npm install
3. Configure Environment Variables
Copy example configs to active ones. Do not commit .env files.
Backend
cd ../museum-cms
cp .env.example .env
Edit .env if changing ports or DB connection strings.
Frontend
cd "../React NextJS museum"
cp .env.example .env.local
Ensure NEXT_PUBLIC_STRAPI_URL points to backend port (default: http://localhost:1337).
4. Run Services
Open two separate terminals.
Terminal A: Start Strapi
cd museum-cms
npm run develop
Wait for: Server ready at http://localhost:1337
Terminal B: Start Next.js
cd "React NextJS museum"
npm run dev
Wait for: Ready started server on 0.0.0.0:3000
5. Initial Setup (First Run Only)
Open browser: http://localhost:1337/admin
Create Super Admin account.
Navigate to Settings → Users & Permissions Plugin → Roles → Public.
Grant permissions:
News-Article: find
News-Page-Setting: find
Bookings: find, create (if booking module is enabled in UI)
Click Save.
6. Verification
Visit http://localhost:3000 — Homepage should load with dynamic content from Strapi.
Check Console (F12) for API errors (usually CORS or 403 Forbidden).
Troubleshooting
Module not found -> Ensure npm install was run in correct directory. Delete node_modules and retry.
Port conflict (EADDRINUSE) -> Kill process using port 3000/1337 or change port in .env.
Empty news list on site -> Verify Public role has find permission in Strapi Admin.
Connection refused to API -> Ensure Strapi terminal is running before starting Next.js.x