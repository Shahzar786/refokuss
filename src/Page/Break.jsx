import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoIosArrowForward } from "react-icons/io";
// import your video from assets if using src folder
// import myVideo from "../assets/Break-Song.mp4";

const meditationColors = ["from-[#7443ff]", "via-[#38bdf8]", "to-[#00C49F]"];
const quotes = [
  "💡 Focus on your progress, not perfection.",
  "🌟 Every small step counts.",
  "🔥 Keep pushing, greatness awaits.",
  "⚡ Take a deep breath and recharge.",
  "🌿 Pause. Breathe. Find your calm." , 
  "⏳ Small breaks, big focus.",
  "🌸 Slow down to move ahead.",
  "⚡ Energy flows where focus goes."

];
const stretches = [
  "Neck Stretch - 30s",
  "Shoulder Roll - 30s",
  "Wrist Flex - 30s",
  "Back Stretch - 30s",
];

function Break() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const nextQuote = () => setQuoteIndex((prev) => (prev + 1) % quotes.length);

  const videoURL = "src/assets/Break-Song.mp4"; // offline video

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-10 flex flex-col items-center gap-10">
      <h1 className="text-4xl font-bold text-center mb-6">Break Time</h1>

      {/* Video + Breathe + Stretches Section */}
      <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-8 mt-4">
        {/* Breathe Circle */}
        <div className="flex flex-col items-center gap-4 lg:w-1/5">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`w-36 h-36 lg:w-40 lg:h-40 rounded-full bg-gradient-to-tr ${meditationColors.join(
              " "
            )} flex items-center justify-center shadow-2xl`}
          >
            <span className="text-white font-bold text-lg text-center">Breathe</span>
          </motion.div>
          <p className="text-center text-gray-300 text-sm lg:text-base mt-2">
            Follow the circle to inhale and exhale slowly.
          </p>
        </div>

        {/* Center Video */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-2/5 rounded-2xl shadow-xl overflow-hidden border-4 border-purple-500"
        >
          <video
            src={videoURL}
            controls
            autoPlay={false}
            loop
            className="w-full rounded-2xl"
          />
        </motion.div>

        {/* Quick Stretches */}
        <div className="flex flex-col gap-4 items-center lg:w-1/5">
          <h2 className="text-xl font-bold mb-2">Quick Stretches</h2>
          {stretches.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-3 lg:p-4 bg-zinc-800 rounded-xl shadow-md w-36 lg:w-48 text-center text-sm lg:text-base"
            >
              {s}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Motivational Quote Carousel */}
      <div className="flex flex-col items-center gap-4 flex-1 w-full mt-10">
        <motion.div
          key={quoteIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="p-6 bg-zinc-800 rounded-2xl shadow-lg text-center max-w-md"
        >
          {quotes[quoteIndex]}
        </motion.div>
        <button
          onClick={nextQuote}
          className="mt-2 bg-gradient-to-br from-purple-500 via-blue-500 to-teal-400 px-6 py-2 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
        >
          Next Quote <IoIosArrowForward className="inline-block ml-2" />
        </button>
      </div>
    </div>
  );
}

export default Break;
