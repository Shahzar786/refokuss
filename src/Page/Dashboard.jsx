import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { motion } from "framer-motion";

function Dashboard() {
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [timeFocused, setTimeFocused] = useState(0); // ✅ renamed from hoursFocused
  const[totalTask,setTotalTask]= useState(0);

  // ✅ ToDo Completed fetch
  const getTodos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/todo");
      const completedCount = res.data.filter((t) => t.completed).length;
      setTasksCompleted(completedCount);
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  };

  // ✅ Stopwatch Time fetch (in minutes)
  const getStopwatches = async () => {
    try {
      const res = await axios.get("http://localhost:5000/stopwatch");
      const totalMinutes = res.data.reduce(
        (sum, s) => sum + s.focusTime / 60,
        0
      );
      setTimeFocused(totalMinutes.toFixed(2)); // ✅ minutes
    } catch (err) {
      console.error("Error fetching stopwatch:", err);
    }
  };

   const fetchPomodoroData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/pomodoro"); // 🔗 backend route
        setTimeFocused(res.data.totalFocus); // ⬅️ total minutes focused
      } catch (error) {
        console.error("Error fetching pomodoro data:", error);
      }
    };

    const fetchTotalTask = async () => {
      try {
        const res = await axios.get("http://localhost:5000/totaltask"); // 🔗 backend route
        setTotalTask(res.data.totalTask); // ⬅️ total minutes focused
      } catch (error) {
        console.error("Error fetching pomodoro data:", error);
      }
    };


  useEffect(() => {
    getTodos();
    getStopwatches();
    fetchPomodoroData();
    fetchTotalTask();
  }, []);

  // ✅ Hardcoded Weekly Study Hours (Line Chart)
  const studyData = [
    { day: "Mon", hours: 5 },
    { day: "Tue", hours: 4 },
    { day: "Wed", hours: 6 },
    { day: "Thu", hours: 3 },
    { day: "Fri", hours: 7 },
    { day: "Sat", hours: 8 },
    { day: "Sun", hours: 5 },
  ];

  // ✅ Hardcoded Pie Chart Data
  const pieData = [
    { name: "DSA", value: 6 },
    { name: "Aptitude", value: 5 },
    { name: "Web-Dev", value: 7 },
    { name: "AI", value: 2 },
    { name: "Reasoning", value: 3 },
    { name: "english", value: 5 },
  ];

  const COLORS = ["#7443ff", "#8A2BE2" ,"#38bdf8", "#facc15" ,"#00C49F" ,"#FF5A70"  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-10">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-[#7443ff] via-[#38bdf8] to-[#00C49F] bg-clip-text text-transparent"
      >
        📊 Analytics Dashboard
      </motion.h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
        {[
          { title: "Tasks Completed", value: tasksCompleted },
          { title: "Time Focused", value: `${timeFocused} min` }, // ✅ updated label and unit
        { title: "Total Tasks", value: totalTask }, // hardcoded for now
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 20px rgba(116,67,255,0.5)",
            }}
            className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-xl p-6 transition-transform duration-300 group"
          >
            <h2 className="text-lg text-zinc-400">{stat.title}</h2>
            <p className="text-4xl font-extrabold mt-3 bg-gradient-to-r from-[#7443ff] via-[#38bdf8] to-[#00C49F] bg-clip-text text-transparent">
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-14">
        {/* Line Chart */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileHover={{
            scale: 1.02,
            boxShadow: "0px 0px 25px rgba(56,189,248,0.3)",
          }}
          className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6 shadow-xl transition-all duration-500"
        >
          <h2 className="text-2xl font-semibold mb-6">📈 Study Hours (Week)</h2>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={studyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
              <XAxis dataKey="day" stroke="#bbb" />
              <YAxis stroke="#bbb" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#111",
                  borderRadius: "12px",
                  border: "1px solid #333",
                  color: "#fff",
                }}
              />
              <Line
                type="monotone"
                dataKey="hours"
                stroke="#7443ff"
                strokeWidth={3}
                dot={{ fill: "#38bdf8", r: 6 }}
                activeDot={{ r: 10, fill: "#00C49F" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileHover={{
            scale: 1.02,
            boxShadow: "0px 0px 25px rgba(0,196,159,0.3)",
          }}
          className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6 shadow-xl transition-all duration-500"
        >
          <h2 className="text-2xl font-semibold mb-6">🕒 Time Distribution</h2>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#111",
                  borderRadius: "12px",
                  border: "1px solid #333",
                  color: "#fff",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;
