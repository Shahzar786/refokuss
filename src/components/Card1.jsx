import { motion } from 'framer-motion';
import React from 'react';
import { IoIosArrowRoundForward } from "react-icons/io";


function Card1({width, start, para, hover="false"}) {
  return (
     <motion.div  whileHover={{backgroundColor: hover==="true" && "#7443ff", padding: "25px" }} className={`bg-zinc-800 p-5 rounded-xl hover:${hover} ${width} min-h-[30rem] flex flex-col justify-between `} >
            <div className='w-full '>
              
            <div className=' w-full underline flex justify-between items-center'>
                <h3>Notes</h3>
                 <IoIosArrowRoundForward />
                 
            </div>
            <h1 className='text-3xl font-serif mt-5 '> Title' </h1>
           </div>
            <div className='down w-full  '>
                {
                      start === true && (
                       <>
                        <h1 className='text-6xl font-semibold tracking-tighter leading-none ' > Start a project </h1>
                        <button className='rounded-full mt-5 py-2 px-5 border-[1px] border-zinc-100  ' >Contact Us</button>
                       </>
             ) 
          }
              { para && (
                 <p className='text-sm text-zinc-500 font-medium'>Enjoy The Best Productivity Enhancer Website.</p>
              )}  
              
            </div>
        </motion.div>
  )
}

export default Card1