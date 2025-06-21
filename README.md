# 🛠️ Full Stack Task - Backend (NestJS)

This is the backend service for the Full Stack Task project, built with **NestJS**, **TypeORM**, **PostgreSQL**, and **JWT Authentication**.

---

## 🚀 How to Run

1. **Install dependencies**

```bash
npm install
```

2. **Start the server**

to run localy

```bash
npm run start
```

To run the server with hosted database in production mode

```bash
npm run start:prod
```

2. **Add .env.development File (Example)**

if you run it using npm run start command ==> Create a file named .env.development in the root folder and paste the following:

```bash

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=0000
DB_NAME=postgres
TYPEORM_SYNC=true


JWT_SECRET=abedalnabi
JWT_EXPIRES_IN=1d
```

if you run it using npm run start:prod command ==> Create a file named .env.production in the root folder and paste the following:

```bash

NODE_ENV=production
DB_HOST='dpg-d1b5cf3e5dus73e8clj0-a.oregon-postgres.render.com'
DB_PORT=5432
DB_USER='abedalnabi_user'
DB_PASS='Zxw4pYC5Q9yERgQ3JOAjeOz8Tmso73No'
DB_NAME='abedalnabi'

TYPEORM_SYNC=true

JWT_SECRET=abedalnabi
JWT_EXPIRES_IN=1d
```
