# SkillSwipe Backend

<div align="center">

[![Go Version](https://img.shields.io/badge/Go-1.21+-00ADD8?style=for-the-badge&logo=go)](https://golang.org)
[![Node.js Version](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=nodedotjs)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)
[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)

**A dual-technology backend system for the SkillSwipe platform**

</div>

---

## Overview

SkillSwipe Backend provides a robust, scalable API service implemented in **two modern technologies**:

- **Go Backend** - High-performance, concurrent-ready implementation
-**Node.js Backend** - Event-driven, rapid-development implementation

Both implementations offer identical functionality with technology-specific optimizations.

---

##  Project Structure

SkillSwipe-Backend/
<p>│</p>
<p>├── Backend-go/</p>
<p>│ ├── main.go # Application entry point</p>
<p>│ ├── go.mod # Go module dependencies</p>
<p>│ ├── go.sum # Dependency checksums</p>
<p>│ ├── config/ # Database & configuration management</p>
<p>│ ├── routes/ # API route definitions</p>
<p>│ ├── Middleware/ # JWT authentication & request filters</p>
<p>│ └── utils/ # Error handling & logging utilities</p>
<p>│</p>
<p>└── Backend-node/</p>
<p>├── server.js # Application entry point</p>
<p>├── package.json # NPM dependencies</p>
<p>├── package-lock.json # Dependency lock file</p>
<p>├── config/ # DB connection & CORS configuration</p>
<p>├── routes/ # API route definitions</p>
<p>├── controllers/ # Request handlers & business logic</p>
<p>├── Middleware/ # JWT verification & rate limiting</p>
<p>└── utils/ # AppError, JWT helpers & email service</p>


---

## Getting Started

### Prerequisites

- **Go Backend**: Go 1.21 or higher
- **Node.js Backend**: Node.js 18.x or higher
- **MongoDB**: 6.0 or higher
- **npm** or **yarn** (for Node.js backend)

### 🔧 Installation

#### Clone the repository
git clone https://github.com/3mrkhalid/SkillSwipe-Backend.git
<p>cd SkillSwipe-Backend</p>


## run Backend-Go
cd Backend-go
go mod tidy
go run main.go

## run Backend-node
cd Backend-node
npm install
## Run in development
npm run dev
## Or production
npm run prod

### Environment Variables for Node.js
PORT=<your-port>
NODE_ENV="development"
MONGO_URI=<your-mongo-uri>
JWT_ACCESS_SECRET=<jwt-access-secret>
JWT_REFRESH_SECRET=<jwt-refresh-secret>
EMAIL_USER=<your-email>
EMAIL_PASS=<your-email-password>

### Environment Variables for GO
PORT=<your-port>
MONGO_URI=<your-mongo-uri>
JWT_ACCESS_SECRET=<jwt-access-secret>


