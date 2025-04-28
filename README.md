# 📈 Reacti-Do - The Ultimate MERN Stack To-Do List App

Reacti-Do is a sleek, high-performance MERN stack (MongoDB, Express, React, Node.js) based to-do list application.

It offers user authentication, protected routes, dynamic theming, smooth UI transitions, and CRUD operations for lists and items — all optimized with best practices, modern design, and full SEO support!

---

---

## 📸 Preview

Here are some screenshots showcasing Reacti-Do:
![Screenshot 2025-04-28 100857](https://github.com/user-attachments/assets/da478bd2-dbb7-47cc-8b17-e64d2e8573ec)
![Screenshot 2025-04-28 101341](https://github.com/user-attachments/assets/af89b913-c59e-4831-88d8-49f2ddbfaab6)
![Screenshot 2025-04-28 101352](https://github.com/user-attachments/assets/03be6bde-0fbf-430a-8176-15dd0875cdf5)
![Screenshot 2025-04-28 101429](https://github.com/user-attachments/assets/5b1ef229-883f-4f41-a51d-7d77961c0e2d)
![Screenshot 2025-04-28 102058](https://github.com/user-attachments/assets/065d70d5-8b93-4d01-8a1c-50f3a0c36b0f)

---

---

## 📁 Folder Structure

```
reacti-do/
│
├── backend/
│   ├── package-lock.json
│   ├── package.json
│   └── src/
│       ├── server.js
│       ├── controllers/
│       │   ├── auth.controller.js
│       │   ├── todoItem.controller.js
│       │   └── todoList.controller.js
│       ├── data/
│       │   └── seedDataForExisting.js
│       ├── lib/
│       │   ├── cloudinary.js
│       │   ├── db.js
│       │   └── utils.js
│       ├── middleware/
│       │   └── protectRoute.middleware.js
│       ├── models/
│       │   ├── todoItem.model.js
│       │   ├── todoList.model.js
│       │   └── user.model.js
│       └── routes/
│           ├── auth.route.js
│           ├── todoItem.route.js
│           └── todoList.route.js
│
├── frontend/
│   ├── package-lock.json
│   ├── package.json
│   ├── public/
│   │   └── logo.svg
│   │   └── manifest.json
│   │   └── robots.txt
│   │   └── sitemap.xml
│   └── src/
│       ├── assets/
│       │   ├── login.svg
│       │   └── signup.svg
│       ├── components/
│       │   ├── AuthenticationRightSide.jsx
│       │   ├── AuthRoute.jsx
│       │   ├── CreatorInput.jsx
│       │   ├── EditableInput.jsx
│       │   ├── Header.jsx
│       │   ├── InputField.jsx
│       │   ├── ProtectedRoute.jsx
│       │   ├── TodoItems.jsx
│       │   └── TodoLists.jsx
│       ├── lib/
│       │   ├── axiosInstance.js
│       │   ├── constants.js
│       │   └── utils.js
│       ├── pages/
│       │   ├── HomePage.jsx
│       │   ├── LoginPage.jsx
│       │   ├── ProfilePage.jsx
│       │   ├── SettingsPage.jsx
│       │   └── SignupPage.jsx
│       ├── store/
│       │   ├── useAuthStore.js
│       │   ├── useThemeStore.js
│       │   ├── useTodoItemStore.js
│       │   └── useTodoListStore.js
│       ├── App.jsx
│       ├── index.css
│       └── main.jsx
│
├── .vscode/
├── .gitignore
├── .env-example
├── LICENSE
└── README.md
```

---

## 🚀 Features

- User authentication (signup, login, logout, profile update)
- Secured user-specific CRUD operations
- Create, update, and delete todo lists
- Add, edit, complete, and delete todo items
- Profile management with profile picture upload
- Theme selection (multiple themes) 35 unique Themes
- Responsive and modern UI
- Toast notifications for actions
- Protected routes for authenticated users
- Clean, intuitive user interface for ultimate productivity.

---

## 🛠️ Tech Stack

### 🧩 Frontend

[![React](https://img.shields.io/badge/React-20232a?logo=react&logoColor=61DAFB&style=for-the-badge)](https://react.dev)
[![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=reactrouter&logoColor=white&style=for-the-badge)](https://reactrouter.com)
[![Zustand](https://img.shields.io/badge/Zustand-000000?logo=zustand&logoColor=white&style=for-the-badge)](https://zustand-demo.pmnd.rs/)
[![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white&style=for-the-badge)](https://axios-http.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwindcss&logoColor=white&style=for-the-badge)](https://tailwindcss.com)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-3E497A?style=for-the-badge&logoColor=white)](https://daisyui.com)
[![Lucide React](https://img.shields.io/badge/Lucide-000000?logo=lucide&logoColor=white&style=for-the-badge)](https://lucide.dev)
[![Motion](https://img.shields.io/badge/Motion-0E0E0E?logo=framer&logoColor=white&style=for-the-badge)](https://motion.dev)
[![Vite](https://img.shields.io/badge/Vite-646cff?logo=vite&logoColor=white&style=for-the-badge)](https://vitejs.dev)

### ⚙️ Backend

[![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white&style=for-the-badge)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white&style=for-the-badge)](https://mongodb.com)
[![Mongoose](https://img.shields.io/badge/Mongoose-880000?logo=mongoose&logoColor=white&style=for-the-badge)](https://mongoosejs.com)
[![BcryptJS](https://img.shields.io/badge/BcryptJS-003B6F?style=for-the-badge)](https://github.com/dcodeIO/bcrypt.js)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?logo=cloudinary&logoColor=white&style=for-the-badge)](https://cloudinary.com)
[![Cookie-Parser](https://img.shields.io/badge/Cookie--Parser-005555?style=for-the-badge)](https://www.npmjs.com/package/cookie-parser)
[![CORS](https://img.shields.io/badge/CORS-0055FF?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
[![JWT](https://img.shields.io/badge/JWT-000000?logo=jsonwebtokens&logoColor=white&style=for-the-badge)](https://jwt.io)

---

## ⚡ Getting Started

### Prerequisites

- Node.js (v22+ recommended)
- npm
- Express.js version 5
- MongoDB instance (local or cloud)
- Cloudinary account (for profile picture uploads)

### 1. Setup Instructions

```bash
# Clone the repository
git clone https://github.com/thekiranmahajan/reacti-do.git
cd reacti-do

# Navigate to backend
cd reacti-do/backend
npm install

# Navigate to frontend
cd ../frontend
npm install

# Start backend server
cd ../backend
npm run dev

# Start frontend Vite dev server
cd ../frontend
npm run dev
```

### 2. Setup Environment Variables

Create a `.env` file in the root directory with the following (fill in your values):

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NODE_ENV=development
PORT=5000
```

## 📋 License

This project is licensed under the [MIT License](LICENSE).

---

## ✨ Author

- [Kiran Mahajan](https://github.com/thekiranmahajan)
- **LinkedIn** : [thekiranmahajan](https://linkedin.com/in/thekiranmahajan)

---

> Built with 🥭 by Kiran Mahajan
