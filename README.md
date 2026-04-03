# SkillSwipe Backend

This repository contains the **backend for SkillSwipe** project, implemented in **two technologies**:

- **Go Backend** (`/Backend-go`)  
- **Node.js Backend** (`/Backend-node`)

---

## Project Structure

├─ main.go
├─ go.mod
├─ go.sum
├─ config/ # DB connection & configuration
├─ routes/ # API routes
├─ Middleware/ # JWT verification, etc.
└─ utils/ # Error handling & logger

/Backend-node
├─ server.js
├─ package.json
├─ package-lock.json
├─ config/ # DB connection, CORS, allowed origins
├─ routes/ # API routes
├─ controllers/ # Route controllers
├─ Middleware/ # JWT verification, rate limiting
└─ utils/ # AppError, JWT helpers, sendMail


---

## Technologies Used

### Go Backend:
- Go 1.20+
- MongoDB
- Gorilla Mux / Native Router
- JWT Authentication
- Custom Middleware

### Node.js Backend:
- Node.js 18+
- Express.js
- MongoDB
- JWT Authentication
- Rate Limiting Middleware
- Nodemailer (Email notifications)

---

## Admin Capabilities

The system has a **User role: `admin`** with full control over the platform:

- Manage Users (ban/unban)
- Delete or Update any Post
- Delete or Update any Comment
- Manage Rooms (create, update, delete)
- View all Messages
- Send Notifications

---

## Getting Started

### Prerequisites
- MongoDB running locally or on Atlas
- Node.js 18+ installed
- Go 1.20+ installed

### Node.js Backend 
1-cd Backend-node
2-npm install
3- if you run in development make (npm run dev) else npm run prod

### GO Backend
1-cd Backend-go
2-go mod tidy
3-go run main.go

### .env in Node.js
PORT=<your-port>
NODE_ENV="development"
MONGO_URI= <your-mongo-uri>
JWT_ACCESS_SECRET=<jwt-access-secret>
JWT_REFRESH_SECRET=<jwt-refresh-secret>
EMAIL_USER=<your-email>
EMAIL_PASS=<your-email-password>

### .env in GO
PORT=<your-port>
MONGO_URI=<your-mongo-uri>
JWT_ACCESS_SECRET=<jwt-access-secret>


## Database Schema
 for user
<img width="1280" height="807" alt="image" src="https://github.com/user-attachments/assets/b927ee8b-f81b-42a1-8222-2ce34ae4076a" />

for Admin
<img width="1280" height="724" alt="image" src="https://github.com/user-attachments/assets/2ef2c3f1-4b69-4e44-9a53-f9c20c568848" />


