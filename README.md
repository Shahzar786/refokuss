# 📌 Refocus – Productivity & Task Management App  

Refocus is a modern **productivity tracker app** that combines Pomodoro technique, task management, and notes.  
It helps students, developers, and professionals to **stay focused, manage tasks, and track progress effectively.**  

---

## 🚀 Features  

- ✅ **Pomodoro Timer** – Time-focused sessions with tracking  
- ✅ **Task Management** – Add, delete & track todos  
- ✅ **Notes Section** – Save important notes for quick access  
- ✅ **Dashboard** – Visualize your productivity stats  
- ✅ **Simple UI/UX** – Clean & distraction-free design  

---

## 🛠 Tech Stack  

- **Frontend**: React, TailwindCSS, Axios, Framer Motion, Recharts  
- **Backend**: Node.js, Express.js, MongoDB (Mongoose)  
- **Database**: MongoDB Compass / Atlas  

---

## 📂 Project Structure  

refocus/
│── backend/ # Express.js + MongoDB APIs
│ ├── models/ # Mongoose Schemas
│ ├── routes/ # API Routes
│ ├── server.js # Entry point
│
│── frontend/ # React App
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── App.js
│ │ ├── index.js
│
│── README.md
│── package.json


---

## ⚡ Installation  

### 1️⃣ Clone Repository  
```bash
git clone https://github.com/<your-username>/refocus.git
cd refocus


2️⃣ Setup Backend
cd backend
npm install
npm start
👉 Backend will start on http://localhost:5000

3️⃣ Setup Frontend
cd ../frontend
npm install
npm run dev
👉 Frontend will start on http://localhost:5173 (Vite default)

📊 API Endpoints

GET /totaltask → Returns total number of tasks

POST /todos → Add a new task

GET /todos → Get all tasks

DELETE /todos/:id → Delete a task

POST /pomodoro → Save pomodoro session

🎯 Usage

Run backend and frontend in separate terminals.

Open browser → http://localhost:5173

Start adding tasks, notes, and pomodoro sessions.

Track your focus time and total tasks from dashboard.

🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

📜 License

This project is licensed under the MIT License.

✨ Made with ❤️ and focus to help people stay productive.
