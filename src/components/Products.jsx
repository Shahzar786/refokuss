import React, { useState, useRef, useEffect } from 'react';
import Product from './Product';
import { motion } from 'framer-motion';

function Products() {
  const products = [
    {
       

      title: "Ambient Focus",
      description: "Background sounds improve focus, reduce distractions, enhance memory retention, creativity, calm emotions, and support productive study, work, and mental balance.",
      live: true,
      case: true,
      video: "src/assets/earth-video.mp4"
    },
    {
      title: "Silent Retreat",
      description: "Extended silence encourages reflection, mental clarity, stress reduction, deeper focus, self-discipline, emotional regulation, enhancing study efficiency and life balance.",
     
      video: "src/assets/red-video.mp4"
    },
    {
      title: "Kaizen",
      description: "Small, daily improvements build discipline, resilience, skill mastery, productivity, efficient study habits, long-term growth, and sustainable life-work balance.",
      
      video: "src/assets/green-energy.mp4"
    },
    {
      title: "Celestial Breaks",
      description: "Short, mindful pauses rejuvenate energy, restore focus, reduce mental fatigue, enhance productivity, support emotional balance, and improve study, work efficiency, and overall well-being.",
      
      video: "src/assets/Astronaut-video.mp4"
    },
    {
      title: "Sufi Meditation",
      description: "Mindful repetitions calm the mind, restore focus, reduce stress, improve emotional control, and enhance concentration for effective learning and balanced life.",
      
      video: "src/assets/yellow-energy.mp4"
    }

  ];

  const [pos, setPos] = useState(0);
  const mover = (val) => {
    setPos(val * 23);
  };

  const videoRef = useRef(null);

  // Intersection Observer to pause/play video based on visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.play();
          } else {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.5 } // 50% of video should be visible to play
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [pos]); // observe whenever current product changes

  return (
      
      

    <div className='mt-32 relative'>
      {/* Product list */}
      {products.map((val, index) => (
        <Product key={index} val={val} mover={mover} count={index} />
      ))}

          


      {/* Video Window */}
      <div className='absolute left-0 top-0 w-full h-full pointer-events-none'>
        <motion.div
          initial={{ y: pos, x: "-50%" }}
          animate={{ y: pos + `rem` }}
          transition={{ ease: [0.76, 0, 0.24, 1], duration: 0.5 }}
          className='window absolute w-[32rem] h-[23rem] rounded-xl bg-zinc-800 left-[44%] overflow-hidden'
        >
          <video
            ref={videoRef}
            src={products[pos / 23]?.video}
            loop
            className="w-full h-full object-cover rounded-xl shadow-lg transition-transform duration-500 hover:scale-105"
          />
        </motion.div>
      </div>
    </div>
  );
}

export default Products;
