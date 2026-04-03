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
