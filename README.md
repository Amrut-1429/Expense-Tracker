# 💸 Expense Tracker Pro

A modern, full-stack financial management application built with the MERN stack. Features a premium design, dual-theme support, and secure authentication.

## ✨ Features

- **🔐 Secure Auth**: JWT-based authentication with Bcrypt password hashing.
- **🌓 Dual Themes**: 
  - **Dark Mode**: Sleek glassmorphism for a modern feel.
  - **Light Mode**: Pristine, minimalist "Apple-style" clean white look.
- **📝 Full CRUD**: Add, Edit, and Delete expenses with ease.
- **📊 Analytics**: Visual category breakdown with dynamic progress bars.
- **📱 Responsive**: Optimized for all screen sizes using Tailwind CSS.
- **☁️ Cloud Powered**: Integrated with MongoDB Atlas for reliable storage.

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- MongoDB Atlas account (or local MongoDB)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Amrut-1429/Expense-Tracker.git
   cd Expense-Tracker
   ```

2. **Setup Backend:**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` folder:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

3. **Setup Frontend:**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Run the Project:**
   Use the included `run_project.bat` (on Windows) or:
   - Backend: `npm run dev` (in backend folder)
   - Frontend: `npm run dev` (in frontend folder)

## 🛠 Tech Stack

- **Frontend**: React, Tailwind CSS, Lucide Icons, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Deployment**: Git, MongoDB Atlas

## 📄 License
MIT License
