# Apoorv Portfolio Backend

![Node.js](https://img.shields.io/badge/Runtime-Node.js-339933?logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Framework-Express.js-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/ODM-Mongoose-880000?logo=mongoose&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-000000?logo=jsonwebtokens&logoColor=white)
![bcrypt](https://img.shields.io/badge/Security-bcryptjs-6c63ff)

Backend API for Apoorv Singh's portfolio and admin CMS. This service powers portfolio content management for projects, skills, and experience entries, with protected admin-only create, update, and delete operations.

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT authentication
- bcryptjs password hashing
- ES modules

## Features

- Admin login with JWT token generation
- Protected admin routes using bearer token authentication
- Public API endpoints for portfolio content
- CRUD APIs for projects, skills, and experience
- MongoDB seed scripts for initial admin and portfolio content
- Password hashing through Mongoose middleware

## Project Structure

```txt
apoorv-portfolio-backend/
|-- controllers/
|   |-- authController.js
|   |-- experienceController.js
|   |-- projectController.js
|   `-- skillController.js
|-- middlewares/
|   `-- authMiddleware.js
|-- models/
|   |-- Admin.js
|   |-- Experience.js
|   |-- Project.js
|   `-- Skill.js
|-- routes/
|   |-- authRoutes.js
|   |-- experienceRoutes.js
|   |-- projectRoutes.js
|   `-- skillRoutes.js
|-- scripts/
|   |-- seedAdmin.js
|   `-- seedContent.js
|-- server.js
|-- package.json
`-- README.md
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Create Environment File

Create a `.env` file in the project root:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_admin_password
```

### 3. Seed Admin User

Run this once to create the first admin user:

```bash
npm run seed:admin
```

If the admin already exists, the script will skip creating a duplicate.

### 4. Seed Portfolio Content

Run this to populate projects, skills, and experience data from the frontend `data.js` file:

```bash
npm run seed:content
```

The content seed uses upsert logic, so rerunning it updates existing records instead of creating duplicates.

### 5. Start Development Server

```bash
npm run dev
```

The API will run at:

```txt
http://localhost:5000
```

## Available Scripts

```bash
npm start
```

Runs the server with Node.

```bash
npm run dev
```

Runs the server with Nodemon.

```bash
npm run seed:admin
```

Creates the initial admin account from `.env`.

```bash
npm run seed:content
```

Seeds portfolio content from the frontend data file.

## API Endpoints

### Health Check

```http
GET /
```

Response:

```json
{
    "message": "Portfolio API running"
}
```

## Authentication

### Admin Login

```http
POST /api/auth/login
```

Request body:

```json
{
    "username": "admin_username",
    "password": "admin_password"
}
```

Successful response:

```json
{
    "token": "jwt_token",
    "admin": {
        "id": "admin_id",
        "username": "admin_username"
    }
}
```

Use the returned token for protected requests:

```http
Authorization: Bearer your_jwt_token
```

## Projects API

### Get All Projects

```http
GET /api/projects
```

### Get Single Project

```http
GET /api/projects/:id
```

### Create Project

Protected route.

```http
POST /api/projects
```

Request body:

```json
{
    "num": "01",
    "title": "Project Title",
    "description": "Project description",
    "github": "https://github.com/username/repo",
    "live": "https://project-demo.com"
}
```

### Update Project

Protected route.

```http
PUT /api/projects/:id
```

### Delete Project

Protected route.

```http
DELETE /api/projects/:id
```

## Skills API

### Get All Skills

```http
GET /api/skills
```

### Get Single Skill

```http
GET /api/skills/:id
```

### Create Skill

Protected route.

```http
POST /api/skills
```

Request body:

```json
{
    "name": "React",
    "color": "#61dafb",
    "iconProvider": "simple-icons",
    "icon": "SiReact"
}
```

`iconProvider` supports:

```txt
simple-icons
lucide
```

### Update Skill

Protected route.

```http
PUT /api/skills/:id
```

### Delete Skill

Protected route.

```http
DELETE /api/skills/:id
```

## Experience API

### Get All Experience Entries

```http
GET /api/experience
```

### Get Single Experience Entry

```http
GET /api/experience/:id
```

### Create Experience Entry

Protected route.

```http
POST /api/experience
```

Request body:

```json
{
    "role": "Full Stack Developer",
    "company": "Company Name",
    "period": "Jan 2026 - Present",
    "points": [
        "Built full-stack features using React, Node.js, and MongoDB",
        "Improved API performance and frontend user experience"
    ],
    "tags": ["React", "Node.js", "MongoDB"]
}
```

### Update Experience Entry

Protected route.

```http
PUT /api/experience/:id
```

### Delete Experience Entry

Protected route.

```http
DELETE /api/experience/:id
```

## Database Models

### Admin

- `username`
- `password`

Passwords are hashed automatically before saving.

### Project

- `num`
- `title`
- `description`
- `github`
- `live`

### Skill

- `name`
- `color`
- `iconProvider`
- `icon`

### Experience

- `role`
- `company`
- `period`
- `points`
- `tags`

## Deployment Notes

Before deploying:

- Add production environment variables on the hosting platform.
- Do not commit `.env`.
- Do not commit `node_modules`.
- Use a strong `JWT_SECRET`.
- Make sure MongoDB Atlas allows connections from your deployment environment.

## Should the Scripts Folder Be Committed?

Yes. The `scripts/` folder should be committed because it contains useful setup utilities:

- `seedAdmin.js` creates the first admin account.
- `seedContent.js` imports initial portfolio data into MongoDB.

These scripts do not contain secrets by themselves. Secrets are read from `.env`, which should not be committed.

## License

ISC
