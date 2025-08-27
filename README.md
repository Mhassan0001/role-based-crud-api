Role-Based CRUD API

A Node.js, Express, and MongoDB based REST API that implements Role-Based Access Control (RBAC) with secure authentication using JWT.
This project provides a scalable backend structure for applications requiring user management, authorization, and protected routes.

🚀 Features

User authentication with JWT

Password hashing with bcrypt

Role-based access control (Admin, User, etc.)

CRUD operations for users/data

Protected routes & authorization middleware

MongoDB Atlas integration with Mongoose

Error handling & validation

🛠️ Tech Stack

Node.js

Express.js

MongoDB Atlas

Mongoose

JWT (JSON Web Token)

bcrypt

📂 Project Structure
├── Src
│   ├── Controllers
│   ├── Middleware
│   ├── Models
│   ├── Routes
│   └── app.js
├── package.json
├── .gitignore
└── README.md

⚡ Getting Started
1. Clone the repo
git clone https://github.com/Mhassan0001/role-based-crud-api.git
cd role-based-crud-api

2. Install dependencies
npm install

3. Setup environment variables

Create a .env file in the root directory:

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key

4. Run the server
npm start

⚡ API Endpoints

🔑 Auth Routes

Method	Endpoint	Description	Access
POST	/auth/create	Register new user	Public
POST	/auth/login	Login user & get JWT	Public
POST	/auth/createAdmin	Create new Admin user	Admin only

📌 REST Routes

Method	Endpoint	Description	Access
GET	/rest/check	Test route (check API)	Public
POST	/rest/create	Create new data	Auth required
GET	/rest/read	Read all data	Auth required
GET	/rest/find/:id	Find one record by ID	Auth required
PUT	/rest/update/:id	Update record by ID	Auth required
DELETE	/rest/remove/:id	Delete record by ID	Auth required

🧑‍💻 Author

Hassan
🔗 GitHub Profile
