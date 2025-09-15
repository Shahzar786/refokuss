import React from 'react'
import { motion } from 'framer-motion';



function Marquee({ imagesurls, direction }) {
   return ( 
    <div className='flex w-full overflow-hidden'>
        <motion.div 
           initial={{x: direction==='left' ? "0": "-100%" }} 
           animate={{x: direction==='left' ? "-100%" : "0"}}
           transition={{ease: "linear", duration: 20, repeat: Infinity }} 
           className='flex flex-shrink-0 gap-40 py-10 pr-40'
           >
        {imagesurls.map((url, index) => ( 
          <img key={index} src={url} className='invert' />
        ))}
        </motion.div>
     
      <motion.div 
           initial={{x: direction==='left' ? "0": "-100%" }} 
           animate={{x: direction==='left' ? "-100%" : "0"}}
           transition={{ease: "linear", duration: 20, repeat: Infinity }}
            className='flex flex-shrink-0 gap-40 py-10 pr-40'
            >
        {imagesurls.map((url, index) => ( 
          <img key={index} src={url} className='invert' />
        ))}
        </motion.div>
    </div>
  )
}

export default Marquee