import React from 'react'
import Stripe from './Stripe'


function Stripes() {
    var data = [
        {url:  "https://cdn.prod.website-files.com/664dc8b6bc52b504509197e4/6796cbd90e91519a09b8b326_awwwards.svg", number: 14 },
        {url: "https://cdn.prod.website-files.com/664dc8b6bc52b504509197e4/6796cbd9401c4b4e8378786d_fwa.svg", number: 12 },
        {url: "https://cdn.prod.website-files.com/664dc8b6bc52b504509197e4/6796cbd97af8fb6fc9bbb4c6_cssda.svg", number: 5 },
        {url:  "https://cdn.prod.website-files.com/664dc8b6bc52b504509197e4/6796cbd90e91519a09b8b326_awwwards.svg", number: 14 },
        {url: "https://cdn.prod.website-files.com/664dc8b6bc52b504509197e4/6796cbd9401c4b4e8378786d_fwa.svg", number: 12 },
        {url: "https://cdn.prod.website-files.com/664dc8b6bc52b504509197e4/6796cbd97af8fb6fc9bbb4c6_cssda.svg", number: 5 },
    ]
  return (
    <div className='flex items-center mt-20'>
        {data.map((elem, index)=>(
            <Stripe key={index} val={elem} />
        ))}
    </div>
  )
}

export default Stripes