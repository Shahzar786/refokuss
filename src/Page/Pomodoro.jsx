import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

function Pomodoro() {
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [task, setTask] = useState("Select a Task");

  // Timer Logic
  useEffect(() => {
    let timer;
    if (isActive && time > 0) {
      timer = setInterval(() => setTime((t) => t - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isActive, time]);

  const formatTime = (t) => {
    const minutes = Math.floor(t / 60);
    const seconds = t % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const resetTimer = async () => {
  setIsActive(false);

  const minutesFocused = Math.floor((25 * 60 - time) / 60);

  console.log("⏱ Task:", task);
  console.log("⏱ Time left (seconds):", time);
  console.log("⏱ Minutes Focused:", minutesFocused);

  if (task !== "Select a Task" && minutesFocused > 0) {
    try {
      console.log("📤 Sending to API:", {
        task,
        minutesFocused,
      });

      const res = await axios.post("http://localhost:5000/pomodoro", {
        task,
        minutesFocused,
      });

      console.log("✅ API Response:", res.data);
      alert(`Session saved: ${task} - ${minutesFocused} min`);
    } catch (err) {
      console.error("❌ Error saving session:", err.response?.data || err.message);
    }
  } else {
    console.warn("⚠️ Not saving: invalid task or minutesFocused <= 0");
  }

  setTime(25 * 60);
};

  // Subject Categories (Bright colors)
  const tasks = [
    { name: "DSA", color: "from-pink-500 to-yellow-500" },
    { name: "Aptitude", color: "from-green-400 to-teal-500" },
    { name: "Reasoning", color: "from-purple-500 to-indigo-500" },
    { name: "Web Development", color: "from-blue-500 to-cyan-400" },
    { name: "AI", color: "from-yellow-400 to-orange-500" },
    { name: "English", color: "from-red-500 to-pink-600" },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-10">
      {/* Timer Section */}
      <motion.div
        className="mb-14 text-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-wide">
          {task}
        </h1>

        {/* Circular Timer */}
        <div className="relative w-56 h-56 mx-auto mb-6">
          <svg className="absolute top-0 left-0 w-full h-full">
            <circle
              cx="112"
              cy="112"
              r="100"
              stroke="#1f2937"
              strokeWidth="12"
              fill="none"
            />
            <circle
              cx="112"
              cy="112"
              r="100"
              stroke="#3b82f6"
              strokeWidth="12"
              fill="none"
              strokeDasharray={2 * Math.PI * 100}
              strokeDashoffset={2 * Math.PI * 100 * (1 - time / (25 * 60))}
              strokeLinecap="round"
              transform="rotate(-90 112 112)"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl font-mono">{formatTime(time)}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-6 justify-center">
          <button
            onClick={() => setIsActive(!isActive)}
            className="px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/50 transition"
          >
            {isActive ? "Pause" : "Start"}
          </button>
          <button
            onClick={resetTimer}
            className="px-6 py-2 rounded-full bg-zinc-700 hover:bg-zinc-600 shadow-md transition"
          >
            Save & Reset
          </button>
        </div>
      </motion.div>

      {/* Subject Categories */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {tasks.map((t, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.07, rotate: 1 }}
            whileTap={{ scale: 0.95 }}
            className={`p-8 rounded-2xl cursor-pointer bg-gradient-to-br ${t.color} shadow-xl shadow-black/40`}
            onClick={() => setTask(t.name)}
          >
            <h2 className="text-2xl font-semibold">{t.name}</h2>
            <p className="text-sm opacity-80">Focus on {t.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Pomodoro;
