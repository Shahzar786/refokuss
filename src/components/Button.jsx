import React from "react";
import { IoMdReturnRight } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function Button({ title, to }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="w-fit px-4 py-2 bg-zinc-100 text-black rounded-full flex items-center justify-between gap-2 cursor-pointer hover:bg-blue-400 transition-all"
    >
      <span className="text-sm font-medium">{title}</span>
      <IoMdReturnRight />
    </div>
  );
}

export default Button;
