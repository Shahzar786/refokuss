import React, { useEffect, useState } from "react";
import axios from "axios";

function MotivationalQuote() {
  const [quote, setQuote] = useState("");

  const getQuote = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/quote?nocache=${Date.now()}`
      );
      console.log("Fetched:", res.data);
      setQuote(res.data.q + " — " + res.data.a);
    } catch (error) {
      console.error("Error fetching quote:", error);
      setQuote("Stay strong, keep pushing forward! 💪");
    }
  };

  useEffect(() => {
    getQuote(); // ✅ pehla quote load hoga
  }, []);

  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-bold">Motivational Quote</h2>
      <p className="mt-3 text-lg italic">"{quote}"</p>
      <button
        onClick={getQuote}
        className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md"
      >
        New Quote
      </button>
    </div>
  );
}

export default MotivationalQuote;
