# Expense Tracker Full Stack App

A professional, full-stack expense tracking application built with Node.js, Express, MongoDB, and React.

## 🚀 Quick Start

To run the full project automatically:
1. Double-click the `run_project.bat` file in this directory.
2. It will open two terminal windows, install dependencies, and start both servers.

## 🛠 Tech Stack

### Backend
- **Node.js & Express**: Fast and scalable server framework.
- **MongoDB & Mongoose**: Flexible NoSQL database and ODM.
- **JWT (JSON Web Tokens)**: Secure authentication.
- **Bcryptjs**: Password hashing for security.

### Frontend
- **React (Vite)**: Modern UI library with fast HMR.
- **Tailwind CSS**: Premium styling with glassmorphism and custom gradients.
- **Lucide Icons**: Beautiful, consistent iconography.
- **Axios**: Promised-based HTTP client for API calls.

## 📝 Features
- User Registration & Login with secure sessions.
- Protected Dashboard for managing personal expenses.
- Add, View, and Delete expenses.
- Filter by Category (Food, Travel, Shopping, Health, Entertainment, Other).
- Visual Summary with spending breakdown and totals.

## ⚠️ Troubleshooting
### MongoDB Connection Error
If the backend fails to connect to MongoDB:
1. Ensure MongoDB is running locally at `mongodb://localhost:27017`.
2. **OR** use **MongoDB Atlas** (Cloud):
   - Replace the `MONGO_URI` in `backend/.env` with your Atlas connection string.

### 'npm' is not recognized
If you see this error, you need to install [Node.js](https://nodejs.org/) on your computer.

## 📂 Structure
- `/backend`: API logic, models, and middleware.
- `/frontend`: React application and assets.
