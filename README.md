# 🚀 Role-Based CRUD API

A **Node.js, Express, and MongoDB** based REST API that implements **Role-Based Access Control (RBAC)** with secure authentication using JWT.
This project provides a scalable backend structure for applications **requiring user management, authorization, protected routes, and file uploads**.

---

## ✨ Features
- 🔑 User authentication with **JWT**
- 🔒 Password hashing with **bcrypt**
- 👥 Role-based access control (**Admin, User, etc.**)
- 📦 CRUD operations for users/data
- 🛡️ Protected routes & authorization middleware
- 🌍 MongoDB Atlas integration with **Mongoose**
- ⚡ Error handling & validation
   
## 🔍 Advanced Query Features
- ✅ Input validation with **Express Validator**
- 📄 Pagination
- 🔃 Sorting
- 🎯 Filtering
- 🔍 Searching
---

## 🛠️ Tech Stack
- **Node.js**
- **Express.js**
- **MongoDB Atlas**
- **Mongoose**
- **JWT (JSON Web Token)**
- **bcrypt**
- **express-validator**
- **Multer (Local Storage)**

---

## 📂 Project Structure

```bash
role-based-crud-api/
 ├── src/
 │   ├── Controllers/
 │   ├── Middleware/
 │   ├── Models/
 │   ├── Routes/
 │   ├── Db/
 │   └── app.js
 ├── package.json
 └── .gitignore

```

---

## ⚡ Getting Started

#### 1️⃣ Clone the repo
- git clone https://github.com/Mhassan0001/role-based-crud-api.git
- cd role-based-crud-api

#### 2️⃣ Install dependencies
- npm install

#### 3️⃣ Setup environment variables

##### Create a .env file in root directory

- port=5000
- MonogoUri=your_mongodb_uri
- JWT_KEY=your_secret_key

#### 4️⃣ Run the server

- npm start

---

## 📡 API Endpoints


#### 🔑 Auth Routes

```bash

POST   /auth/create        -> Register new user   (Public)
POST   /auth/login         -> Login user & get JWT (Public)
POST   /auth/createAdmin   -> Create Admin user   (Admin only)

```

#### 📌 REST Routes


```bash

GET    /rest/check         -> Test API route       (Public)
POST   /rest/create        -> Create new data      (Auth required)
GET    /rest/read          -> Read all data        (Auth required)
GET    /rest/find/:id      -> Find record by ID    (Auth required)
PUT    /rest/update/:id    -> Update record by ID  (Auth required)
DELETE /rest/remove/:id    -> Delete record by ID  (Auth required)

```

> ℹ️ Note: `find`, `update`, `remove` → User can only access own records, while **Admin** can access any record.

---

## 👨‍💻 Author

- **Hassan**  
  🔗 [GitHub Profile](https://github.com/Mhassan0001)  
  🔗 [LinkedIn](https://www.linkedin.com/in/muhammad-hassan-36912a22b)
