import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from "./Button";

function Navbar() {
  const navigate = useNavigate();
  const links = ["Home", "Work", "Calendar", "Goals", "", "My Progress"];

  return (
    <div className='z-50 sticky top-0 max-w-screen-xl mx-auto py-6 flex items-center justify-between border-b-[1px] font-["satoshi"] border-zinc-700'>
      <div className='nleft flex items-center'>
        <img 
          src="https://assets-global.website-files.com/6334198f239547d0f9cd84b3/63349803431f1562dccf1802_refokus%20logo.svg" 
          alt="logo" 
        />

        <div className='links flex gap-14 ml-20'>
          {links.map((elem, index) => {
            // Route setup
            let path = "";
            if (elem === "Home") path ="/";
            if (elem === "Work") path = "/Stopwatch";
            if (elem === "Calendar") path = "/Calendar";
            if (elem === "Goals") path = "/ToDo";
            if (elem === "My Progress") path = "/Dashboard";

            return (
              <Link 
                key={index}
                to={path}
                className='font-regular text-md flex items-center gap-2'
              >
                {/* Divider before My Progress */}
                {index === 4 && (
                  <span className='w-[2px] h-5 bg-zinc-600'></span>
                )}

                {/* Green dot before Work */}
                {index === 1 && (
                  <span 
                    style={{ boxShadow: "0 0 0.45em #00FF19" }}
                    className='inline-block w-2 h-2 rounded-full bg-green-500'
                  ></span>
                )}

                {elem}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Notes Button */}
      <div onClick={() => navigate("/Notes")}>
        <Button title={"My Notes"} />
      </div>
      
    </div>
  );
}

export default Navbar;
