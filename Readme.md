# Authentication Backend

## Overview

This is a Node.js authentication backend built using Express, Sequelize, SQLite, and JWT authentication.

The backend provides:

* User Registration
* User Login
* JWT Token Authentication
* Protected Routes
* Password Hashing
* User Authorization Middleware

---

## Features

* Register New Users
* Login Existing Users
* Generate JWT Tokens
* Protected API Routes
* Middleware-based Authentication
* Password Encryption with bcrypt
* Sequelize ORM Integration

---

## Tech Stack

* Node.js
* Express.js
* Sequelize ORM
* SQLite
* JWT Authentication
* bcryptjs
* CORS

---

## Project Structure

```bash
Routes/
middleware/
config/
server.js
usersdb.js
```

---

## Installation

### 1. Clone Repository

```bash
git clone YOUR_GITHUB_REPO_URL
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment Variables

Create a `.env` file in the root directory:

```env
JWT_SECRET=your_secret_key
PORT=5000
```

### 4. Start Development Server

```bash
npm run dev
```

---

## API Endpoints

### Authentication Routes

```http
POST /api/users/register
POST /api/users/login
GET /api/users/me
```

---

## Authentication

Protected routes require JWT token in request headers:

```http
Authorization: Bearer YOUR_TOKEN
```

---

## Middleware

The project includes authentication middleware for:

* JWT Verification
* User Authorization
* Protected Route Access

---

## Database

Uses SQLite with Sequelize ORM for:

* User Storage
* Password Hashing
* Authentication Management

---

## Frontend Integration

Connected with React + Vite frontend application.

---

## Future Improvements

* Refresh Tokens
* Email Verification
* Password Reset
* PostgreSQL Integration
* Role-based Authorization

---
