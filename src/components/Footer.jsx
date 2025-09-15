import React from 'react'




function Footer() {
  return (
    <div className='w-full'>
       <div className='max-w-screen-xl mx-auto py-10 flex gap-32'>
         <div className='basis-1/2'>
             <h1 className='text-[11.5rem] font-semibold leading-none tracking-tight'>refokus.</h1>       
         </div>

         <div className='basis-1/2 flex gap-4'>
            <div className='basis-1/3'>
                <h4 className='mb-10 text-zinc-500 capitalize' >socials</h4>
                {["Instagram","Twitter (*?)", "LinkedIn"].map((item, index)=> <a key={index} className='block mt-3 text-zinc-600'>{item}</a> )}
            </div>
          
            <div className='basis-1/3'>
                <h4 className='mb-10 text-zinc-500 capitalize' >About Us</h4>
                {["Tools", "Design", "Insights", "Growth"].map((item, index)=> <a key={index} className='block mt-3 text-zinc-600'>{item}</a> )}
            </div>
             <div className='basis-1/2'>
                <p className='text-sm'>Refokus creates innovative experiences that boosts productivity and mental clarity.</p>
                   <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 select-none text-white font-medium text-sm rounded-md">
                    <span className="bg-white/20 px-1.5 py-0.5 rounded-sm font-bold text-white">علی</span>
                   <span className='text-bold'>Shahzar Labs</span>
                  </div>
             </div>
         </div>
       </div>
      
    </div>
  )
}

export default Footer