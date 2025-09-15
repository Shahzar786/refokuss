import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function Stopwatch() {
  const [time, setTime] = useState(0); // seconds
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [totalFocus, setTotalFocus] = useState(0);
  const [todayFocus, setTodayFocus] = useState(0);

  // Timer
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => setTime((t) => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // Fetch Sessions
  const fetchSessions = async () => {
    try {
      const res = await axios.get("http://localhost:5000/stopwatch");
      setSessions(res.data.sessions);
      setTotalFocus(res.data.totalFocus);
      setTodayFocus(res.data.todayFocus);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  // Save Session
  const saveSession = async () => {
    if (time === 0) return;
    try {
      await axios.post("http://localhost:5000/stopwatch", { time });
      setTime(0);
      setIsRunning(false);
      fetchSessions();
    } catch (err) {
      console.error(err);
    }
  };

  // Format
  const formatTime = (sec) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h > 0 ? h + "h " : ""}${m}m ${s}s`;
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-10">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-[#7443ff] via-[#38bdf8] to-[#00C49F] bg-clip-text text-transparent"
      >
        ⏱ Focus Stopwatch
      </motion.h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-14">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-xl p-6 flex flex-col items-center"
        >
          <p className="text-lg text-zinc-400">Total Focus</p>
          <p className="text-4xl font-extrabold mt-3 bg-gradient-to-r from-[#7443ff] via-[#38bdf8] to-[#00C49F] bg-clip-text text-transparent">
            {formatTime(totalFocus)}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-xl p-6 flex flex-col items-center"
        >
          <p className="text-lg text-zinc-400">Today’s Focus</p>
          <p className="text-4xl font-extrabold mt-3 bg-gradient-to-r from-[#00C49F] via-[#38bdf8] to-[#7443ff] bg-clip-text text-transparent">
            {formatTime(todayFocus)}
          </p>
        </motion.div>
      </div>

      {/* Stopwatch Circle */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative w-[20rem] h-[20rem] mx-auto rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_0_40px_rgba(116,67,255,0.4)] flex flex-col items-center justify-center"
      >
        {/* Time Display */}
        <div className="text-5xl font-mono font-bold tracking-wider drop-shadow-lg mb-4">
          {formatTime(time)}
        </div>

        {/* Buttons */}
        <div className="flex gap-6 mt-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => setIsRunning(!isRunning)}
            className={`w-20 h-20 rounded-full font-bold text-lg transition-all duration-300 shadow-lg ${
              isRunning
                ? "bg-gradient-to-br from-red-500 to-red-600 hover:from-red-400 hover:to-red-600 text-white shadow-red-500/40"
                : "bg-gradient-to-br from-green-500 to-green-600 hover:from-green-400 hover:to-green-600 text-white shadow-green-500/40"
            }`}
          >
            {isRunning ? "■" : "▶"}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={saveSession}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-bold shadow-lg shadow-blue-500/40 transition"
          >
            Save
          </motion.button>
        </div>
      </motion.div>

      {/* Sessions History */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mt-14 bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6 shadow-xl"
      >
        <h2 className="text-2xl font-semibold mb-6">📋 Previous Sessions</h2>
        {sessions.length === 0 ? (
          <p className="text-gray-400 italic">No sessions saved yet.</p>
        ) : (
          <ul className="space-y-3">
            {sessions.map((s) => (
              <li
                key={s._id}
                className="flex justify-between p-3 bg-white/10 rounded-lg"
              >
                <span className="font-mono text-lg">
                  {formatTime(s.focusTime)}
                </span>
                <span className="text-gray-400 text-sm">
                  {new Date(s.createdAt).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    </div>
  );
}

export default Stopwatch;
