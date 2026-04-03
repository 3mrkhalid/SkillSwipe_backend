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

- 🚀 **Go Backend** - High-performance, concurrent-ready implementation
- 💚 **Node.js Backend** - Event-driven, rapid-development implementation

Both implementations offer identical functionality with technology-specific optimizations.

---

##  Project Structure

SkillSwipe-Backend/
│
<p>├── Backend-go/</p>
<p>│ ├── main.go # Application entry point</p>
│ ├── go.mod # Go module dependencies
│ ├── go.sum # Dependency checksums
│ ├── config/ # Database & configuration management
│ ├── routes/ # API route definitions
│ ├── Middleware/ # JWT authentication & request filters
│ └── utils/ # Error handling & logging utilities
│
└── Backend-node/
├── server.js # Application entry point
├── package.json # NPM dependencies
├── package-lock.json # Dependency lock file
├── config/ # DB connection & CORS configuration
├── routes/ # API route definitions
├── controllers/ # Request handlers & business logic
├── Middleware/ # JWT verification & rate limiting
└── utils/ # AppError, JWT helpers & email service
