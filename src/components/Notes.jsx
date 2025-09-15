import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowRoundForward } from "react-icons/io";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  // ✅ Fetch notes from backend
  useEffect(() => {
    fetch("http://localhost:5000/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data))
      .catch((err) => console.error(err));
  }, []);

  // ✅ Add note
  const addNote = () => {
    if (title.trim() === "" && details.trim() === "") return;

    fetch("http://localhost:5000/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, details }),
    })
      .then((res) => res.json())
      .then((data) => {
        setNotes([data.note, ...notes]);
        setTitle("");
        setDetails("");
      })
      .catch((err) => console.error(err));
  };

  // ✅ Delete note
  const deleteNote = (id) => {
    fetch(`http://localhost:5000/notes/${id}`, {
      method: "DELETE",
    })
      .then(() => setNotes(notes.filter((note) => note._id !== id)))
      .catch((err) => console.error(err));
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-10">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-8 text-center text-gradient bg-clip-text text-transparent bg-gradient-to-r from-[#7443ff] via-[#38bdf8] to-[#00C49F]"
      >
        ✨ My Notes
      </motion.h1>

      {/* Input Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col md:flex-row gap-4 mb-12 justify-center"
      >
        <input
          type="text"
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-4 rounded-xl bg-zinc-800 border border-zinc-700 w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
        />
        <textarea
          placeholder="Write your note..."
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className="p-4 rounded-xl bg-zinc-800 border border-zinc-700 w-full md:w-2/4 focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
        />
        <button
          onClick={addNote}
          className="px-6 py-3 rounded-2xl font-semibold 
            bg-gradient-to-r from-[#7443ff] via-[#38bdf8] to-[#00C49F]
            hover:from-[#5a2dd9] hover:via-[#22a8e0] hover:to-[#00b386]
            shadow-lg shadow-[#7443ff]/40 transition-all"
        >
          ➕ Add Note
        </button>
      </motion.div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <AnimatePresence>
          {notes.map((note) => (
            <motion.div
              key={note._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-[#bfb6f3] via-[#c6bef9] to-[#a89edd] 
                shadow-lg shadow-black/40 flex flex-col justify-between border border-zinc-700"
            >
              <div>
                <div className="flex justify-between items-center border-b border-zinc-700 pb-2">
                  <h3 className="text-sm uppercase tracking-wider text-zinc-900">
                    Notes 📝
                  </h3>
                  <IoIosArrowRoundForward className="text-xl" />
                </div>
                <h1 className="text-2xl font-semibold mt-4 text-[#1F2937]">{note.title}</h1>
              </div>
              <p className="text-sm text-zinc-900/90 mt-3 flex-1">{note.details}</p>
              <button
                onClick={() => deleteNote(note._id)}
                className="mt-5 px-4 py-2 rounded-xl text-sm font-medium bg-[#866cdb] hover:bg-[#715bb7] transition shadow-md"
              >
                🗑 Delete
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Notes;
