import React from 'react'
import Card1 from './Card1'
import MotivationalQuote from './MotivationalQuote'
import Notes from './Notes'


function Cards() {
  return ( 
      <div className='w-full'>
  <div  className='max-w-screen-xl py-20 mx-auto flex gap-2'>
      
    <Card1 width={"basis-1/3"} start={false} para={true} />
    <Card1  width={"basis-2/3"} start={true} para={false} hover={"true"} / >
    <div className="basis-1/3 h-[20rem] flex items-center justify-center ">
      <MotivationalQuote />
      
    </div>
  </div>
</div>

  )
}

export default Cards