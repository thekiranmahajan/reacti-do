# Reacti-Do

Reacti-Do is a full-stack MERN (MongoDB, Express, React, Node.js) TODO list application that allows users to manage their tasks with a modern, user-friendly interface.

---

## 📁 Folder Structure

```
reacti-do/
│
├── backend/
│   ├── package.json
│   └── src/
│       ├── server.js
│       ├── controllers/
│       ├── data/
│       ├── lib/
│       ├── middleware/
│       ├── models/
│       └── routes/
│
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   ├── assets/
│   │   ├── components/
│   │   ├── lib/
│   │   ├── pages/
│   │   └── store/
│   └── public/
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

## 🚀 Features

- User authentication (signup, login, logout, profile update)
- Create, update, and delete todo lists
- Add, edit, complete, and delete todo items
- Profile management with profile picture upload
- Theme selection (multiple themes)
- Responsive and modern UI
- Toast notifications for actions
- Protected routes for authenticated users

---

## 🛠️ Tech Stack

### Frontend

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Zustand](https://zustand-demo.pmnd.rs/) (state management)
- [Tailwind CSS](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/) (UI)
- [React Hot Toast](https://react-hot-toast.com/) (notifications)
- [Lucide React](https://lucide.dev/) (icons)
- [Axios](https://axios-http.com/) (HTTP requests)
- [React Router](https://reactrouter.com/)

### Backend

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
- [Cloudinary](https://cloudinary.com/) (profile picture uploads)
- [JWT](https://jwt.io/) (authentication)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) (password hashing)
- [cookie-parser](https://www.npmjs.com/package/cookie-parser)
- [CORS](https://www.npmjs.com/package/cors)

---

## ⚡ Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm
- MongoDB instance (local or cloud)
- Cloudinary account (for profile picture uploads)

### 1. Clone the repository

```sh
git clone https://github.com/thekiranmahajan/reacti-do.git
cd reacti-do
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

### 3. Install Dependencies

```sh
# Install root, backend, and frontend dependencies
npm run build
```

### 4. Run the Application

#### Start Backend

```sh
npm run start
```

#### Start Frontend (in a new terminal)

```sh
cd frontend
npm run dev
```

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:5000/api](http://localhost:5000/api)

---

## 📋 License

This project is licensed under the [MIT License](LICENSE).

---

## ✨ Author

- [Kiran Mahajan](https://github.com/thekiranmahajan)