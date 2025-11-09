const express = require("express");
const axios = require("axios");
const cors = require("cors");
const Stopwatch = require("./models/StopWatch");
const Todo = require("./models/ToDo");
const Notes = require("./models/Notes");
const Calendar = require("./models/Calendar");
const Pomodoro = require("./models/Pomodoro"); // ✅ Pomodoro Model import

const app = express();
app.use(cors());
app.use(express.json());

const mongoose = require("mongoose");

const PORT = 5000;

// ✅ MongoDB connection
mongoose
  .connect("mongodb+srv://mdshahzarali:sarim0613@cluster0.o0rmbag.mongodb.net", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB Connected");

    // ------------------- MOTIVATIONAL QUOTE ROUTE -------------------
    app.get("/quote", async (req, res) => {
      try {
        const response = await axios.get("https://zenquotes.io/api/random");
        if (response.data && response.data.length > 0) {
          const quoteData = response.data[0];
          res.json({
            q: quoteData.q,
            a: quoteData.a,
          });
        } else {
          res.json({ q: "Keep moving forward!", a: "Unknown" });
        }
      } catch (err) {
        res.status(500).json({ error: "Failed to fetch quote" });
      }
    });

    // ------------------- STOPWATCH ROUTES -------------------
    app.post("/stopwatch", async (req, res) => {
      try {
        const newSession = new Stopwatch({
          focusTime: req.body.time,
        });
        await newSession.save();
        res.json(newSession);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    app.get("/stopwatch", async (req, res) => {
      try {
        const sessions = await Stopwatch.find().sort({ createdAt: -1 });

        const totalFocus = sessions.reduce((sum, s) => sum + s.focusTime, 0);

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayFocus = sessions
          .filter((s) => s.createdAt >= today)
          .reduce((sum, s) => sum + s.focusTime, 0);

        res.json({
          sessions,
          totalFocus,
          todayFocus,
        });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    // ------------------- TODO ROUTES -------------------
    app.post("/todo", async (req, res) => {
      try {
        const newTodo = new Todo({
          text: req.body.text,
          completed: false,
        });
        const saved = await newTodo.save();
        res.json(saved);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    app.get("/todo", async (req, res) => {
      try {
        const todos = await Todo.find();
        res.json(todos);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    app.put("/todo/:id", async (req, res) => {
      try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ message: "Todo not found" });

        todo.completed = !todo.completed;
        await todo.save();

        res.json(todo);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    app.delete("/todo/:id", async (req, res) => {
      try {
        const deleted = await Todo.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Todo not found" });

        res.json({ message: "Todo deleted successfully" });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    // ------------------- NOTES ROUTES -------------------
    app.post("/notes", async (req, res) => {
      try {
        const { title, details } = req.body;

        if (!title || !details) {
          return res.status(400).json({ message: "Title and details required" });
        }

        const newNote = new Notes({ title, details });
        await newNote.save();

        res
          .status(201)
          .json({ message: "Note created successfully", note: newNote });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    app.get("/notes", async (req, res) => {
      try {
        const notes = await Notes.find().sort({ createdAt: -1 });
        res.json(notes);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    app.delete("/notes/:id", async (req, res) => {
      try {
        const deleted = await Notes.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Note not found" });

        res.json({ message: "Note deleted successfully" });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    // ------------------- CALENDAR ROUTES -------------------
    app.get("/calendar", async (req, res) => {
      try {
        const events = await Calendar.find().sort({ date: 1 });
        res.json(events);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    app.post("/calendar", async (req, res) => {
      try {
        const { title, date } = req.body;

        if (!title || !date) {
          return res.status(400).json({ message: "Title and Date required" });
        }

        const newEvent = new Calendar({ title, date });
        await newEvent.save();

        res
          .status(201)
          .json({ message: "Event created successfully", event: newEvent });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    app.delete("/calendar/:id", async (req, res) => {
      try {
        const deleted = await Calendar.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Event not found" });

        res.json({ message: "Event deleted successfully" });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    // ------------------- POMODORO ROUTES -------------------
    app.post("/pomodoro", async (req, res) => {
      try {
        const { task, minutesFocused } = req.body;

        if (!task || !minutesFocused) {
          return res.status(400).json({ message: "Task and minutesFocused required" });
        }

        const newSession = new Pomodoro({ task, minutesFocused });
        await newSession.save();

        res.status(201).json({ message: "Pomodoro session saved", session: newSession });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    app.get("/pomodoro", async (req, res) => {
      try {
        const sessions = await Pomodoro.find().sort({ date: -1 });

        const totalFocus = sessions.reduce((sum, s) => sum + s.minutesFocused, 0);

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayFocus = sessions
          .filter((s) => s.date >= today)
          .reduce((sum, s) => sum + s.minutesFocused, 0);

        res.json({
          sessions,
          totalFocus,
          todayFocus,
        });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    app.get("/totaltask",async(req,res)=>{
      try {
        const data = await Todo.find();
        res.status(200).json({ totalTask: data.length });
      } catch (error) {
        res.status(500).json({ error: err.message });
      }
    })
    // ✅ Start Server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
  });
