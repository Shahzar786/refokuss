import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

function ToDo() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // Load tasks from backend
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/todo"); // ✅ correct route
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Add new task
  const addTask = async () => {
    if (task.trim() === "") return;
    try {
      const res = await axios.post("http://localhost:5000/todo", { text: task });
      setTasks([...tasks, res.data]);
      setTask("");
    } catch (err) {
      console.error(err);
    }
  };

  // Toggle task
  const toggleTask = async (id) => {
    try {
      const res = await axios.put(`http://localhost:5000/todo/${id}`);
      setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
    } catch (err) {
      console.error(err);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/todo/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center p-10">
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-5xl font-bold mb-10 text-center bg-gradient-to-r from-[#7443ff] via-[#38bdf8] to-[#00C49F] bg-clip-text text-transparent"
      >
        ☑️ My To-Do List
      </motion.h1>

      {/* Input Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-xl flex gap-3 mb-8"
      >
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="flex-1 bg-zinc-900 text-white px-5 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 shadow-md transition duration-300 placeholder:text-zinc-500"
          placeholder="Enter a task..."
        />
        <button
          onClick={addTask}
          className="bg-gradient-to-r from-[#7443ff] via-[#38bdf8] to-[#00C49F] text-black font-semibold px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition transform duration-300"
        >
          Add
        </button>
      </motion.div>

      {/* Task List */}
      <ul className="w-full max-w-xl space-y-4">
        <AnimatePresence>
          {tasks.map((t) => (
            <motion.li
              key={t._id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`flex justify-between items-center px-5 py-3 rounded-2xl shadow-lg border transition-all duration-300
                ${
                  t.completed
                    ? "bg-sky-900/30 border-blue-400"
                    : "bg-zinc-900 border-zinc-800 hover:bg-zinc-800/70"
                }`}
            >
              {/* Task Text */}
              <motion.span
                onClick={() => toggleTask(t._id)}
                className={`cursor-pointer text-lg select-none transition-all duration-300 ${
                  t.completed
                    ? "line-through text-zinc-400 scale-95"
                    : "text-white hover:text-violet-400"
                }`}
                whileHover={{ scale: t.completed ? 1 : 1.05 }}
              >
                {t.text}
              </motion.span>

              {/* Delete Button */}
              <motion.button
                onClick={() => deleteTask(t._id)}
                className="text-red-400 hover:text-red-300 transition-all duration-300"
                whileHover={{ scale: 1.2 }}
              >
                ✖
              </motion.button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {/* Empty State */}
      {tasks.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 text-zinc-500 italic text-lg"
        >
          No tasks yet. Add one!
        </motion.p>
      )}
    </div>
  );
}

export default ToDo;
