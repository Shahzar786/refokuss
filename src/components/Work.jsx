import React, { useState} from 'react'
import { motion,useMotionValueEvent,useScroll } from "framer-motion";



  function Work() { 

    const [images, setImages] = useState([
        {url: "https://cdn.prod.website-files.com/664dc8b6bc52b504509197e4/667c85a1151f26218228b9d3_Refokus.png", top: "62%", left: "50%", isActive: false},
        {url: "https://cdn.prod.website-files.com/664dc8b6bc52b504509197f0/6697d84ab75f918dc8617448_YIR%202022%20-4%204.webp", top: "56%", left: "44%" , isActive: false},
        {url: "https://cdn.prod.website-files.com/664dc8b6bc52b504509197f0/6697d429dd783017a5e1b10e_BCGP%20-%204%203.webp", top: "45%", left: "56%", isActive: false},
        {url: "https://cdn.prod.website-files.com/664dc8b6bc52b504509197f0/6697d86a8a9b4a0505553454_Arqitel%20-%204%203.webp", top: "43%", left: "40%", isActive: false},
        {url: "https://cdn.dribbble.com/userupload/4397937/file/still-c455179ea9487c4fbd25eb7f8c2cf9d5.png?resize=400x0", top: "65%", left: "55%", isActive: false},
        {url: "https://cdn.prod.website-files.com/664dc8b6bc52b504509197f0/6697d713cb10965e8dbdee18_YIR%202021%20-%204%203.webp", top: "57%", left: "58%", isActive: false}
     ])    
       
         const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (data) => {
    function imagesShow(arr) {
      setImages(prev =>
        prev.map((item, index) =>
          arr.includes(index)
            ? { ...item, isActive: true }
            : { ...item, isActive: false }
        )
      );
    }

    switch (Math.floor(data * 100)) {
      case 0:
        imagesShow([]);
        break;
      case 1:
        imagesShow([0]);
        break;
      case 2:
        imagesShow([0, 1]);
        break;
      case 3:
        imagesShow([0, 1, 2]);
        break;
      case 4:
        imagesShow([0, 1, 2, 3]);
        break;
      case 6:
        imagesShow([0, 1, 2, 3, 4]);
        break;
      case 8:
        imagesShow([0, 1, 2, 3, 4, 5]);
        break;
    }
  });

  return (
    <div className='w-full mt-5'>
        <div className=' relative max-w-screen-xl mx-auto text-center'>
            <h1 className='text-[30vw] leading-none font-sans select-none tracking-tight'>work</h1>
            <div className='absolute top-0 w-full h-full '>
                {images.map(
                    (elem, index)=> 
                     (elem.isActive && (
                     <img 
                     key={index}
                     className='absolute w-60 rounded-lg -translate-x-[50%] -translate-y-[50%]' 
                      src={elem.url} 
                      style={{top: elem.top, left: elem.left}}
                       alt="" />))
                    )}
            </div>
        </div>
          
    </div>
  )
}

export default Work