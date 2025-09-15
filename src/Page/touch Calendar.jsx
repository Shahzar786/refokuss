import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [newEvent, setNewEvent] = useState("");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = new Date();

  // 🔹 Fetch events from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/calendar") // 👈 backend ka route
      .then((res) => {
        const eventData = {};
        res.data.forEach((evt) => {
          const key = evt.date.split("T")[0]; // yyyy-mm-dd
          if (!eventData[key]) eventData[key] = [];
          eventData[key].push({ id: evt._id, title: evt.title });
        });
        setEvents(eventData);
      })
      .catch((err) => console.error(err));
  }, []);

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  // 🔹 Add Event (Backend + Frontend)
  const addEvent = async () => {
    if (!newEvent.trim() || !selectedDate) return;
    const eventDate = new Date(year, month, selectedDate);

    try {
      const res = await axios.post("http://localhost:5000/calendar", {
        title: newEvent,
        date: eventDate,
      });

      const evt = res.data.event; // backend returns event object
      const key = evt.date.split("T")[0];

      const updated = { ...events };
      if (!updated[key]) updated[key] = [];
      updated[key].push({ id: evt._id, title: evt.title });

      setEvents(updated);
      setNewEvent("");
      setSelectedDate(null);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Delete Event
  const deleteEvent = async (dateKey, idx) => {
    try {
      const eventId = events[dateKey][idx].id;

      await axios.delete(`http://localhost:5000/calendar/${eventId}`);

      const updated = { ...events };
      updated[dateKey].splice(idx, 1);
      if (updated[dateKey].length === 0) delete updated[dateKey];

      setEvents(updated);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center p-10">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-[#7443ff] via-[#38bdf8] to-[#00C49F] bg-clip-text text-transparent"
      >
        📅 My Calendar
      </motion.h1>

      {/* Month Navigation */}
      <div className="flex items-center justify-center gap-6 mb-6">
        <button onClick={prevMonth} className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 transition">⬅ Prev</button>
        <span className="text-2xl font-semibold text-zinc-300">
          {months[month]} {year}
        </span>
        <button onClick={nextMonth} className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 transition">Next ➡</button>
      </div>

      {/* Calendar + Event Input */}
      <div className="flex flex-col lg:flex-row justify-center items-start gap-8 w-full max-w-6xl">
        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-3 text-center flex-1 max-w-2xl">
          {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((day, i) => (
            <div key={i} className="text-zinc-400 font-medium">{day}</div>
          ))}

          {days.map((day, i) => {
            const key = day ? `${year}-${String(month+1).padStart(2,"0")}-${String(day).padStart(2,"0")}` : null;
            const isToday =
              day &&
              day === today.getDate() &&
              month === today.getMonth() &&
              year === today.getFullYear();

            return (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedDate(day)}
                className={`h-14 flex flex-col items-center justify-center rounded-xl cursor-pointer transition-all duration-300 shadow-md
                  ${
                    !day
                      ? "bg-transparent"
                      : isToday
                      ? "bg-gradient-to-r from-[#7443ff] via-[#38bdf8] to-[#00C49F] text-black font-bold"
                      : "bg-zinc-900 hover:bg-zinc-800 text-white"
                  }`}
              >
                {day}
                {key && events[key] && events[key].length > 0 && (
                  <span className="w-2 h-2 rounded-full bg-[#38bdf8] mt-1"></span>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Event Input */}
        {selectedDate && (
          <div className="w-full max-w-sm bg-zinc-900 p-5 rounded-2xl shadow-lg self-start">
            <h2 className="text-lg mb-3 font-semibold bg-gradient-to-r from-[#7443ff] via-[#38bdf8] to-[#00C49F] bg-clip-text text-transparent">
              Add Event for {selectedDate} {months[month]}, {year}
            </h2>
            <div className="flex gap-3">
              <input
                value={newEvent}
                onChange={(e) => setNewEvent(e.target.value)}
                placeholder="Event name..."
                className="flex-1 bg-zinc-800 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 text-white"
              />
              <button
                onClick={addEvent}
                className="bg-gradient-to-r from-[#7443ff] via-[#38bdf8] to-[#00C49F] text-black px-5 py-2 rounded-xl font-semibold hover:scale-105 transition"
              >
                Add
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Event List */}
      <div className="mt-8 w-full max-w-md space-y-3">
        {Object.entries(events).map(([key, evts], i) => (
          <div key={i} className="bg-zinc-900 p-4 rounded-xl shadow-md">
            <h3 className="text-zinc-400 text-sm mb-2">{key}</h3>
            <ul className="space-y-2">
              {evts.map((e, idx) => (
                <li key={idx} className="flex justify-between items-center text-white bg-zinc-800 px-3 py-2 rounded-lg">
                  <span>• {e.title}</span>
                  <button
                    onClick={() => deleteEvent(key, idx)}
                    className="ml-3 text-red-400 hover:text-red-600 transition"
                  >
                    ✖
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
