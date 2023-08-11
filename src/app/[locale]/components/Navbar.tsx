"use client";

import Image from "next/image";
import { useState } from "react";
import { IoCloseSharp, IoMenuSharp } from "react-icons/io5";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex px-4 justify-between items-center relative">
      <Image
        src={require("../../../../public/jpi-logo-optimized.png")}
        alt="logo"
        width={40}
        height={40}
      />
      <button onClick={() => setIsOpen((prev) => !prev)}>
        {isOpen ? <IoCloseSharp size={24} /> : <IoMenuSharp size={24} />}
      </button>
      <div
        className={`absolute right-0 left-0 top-full border-t border-t-gray-300 ${
          isOpen ? "" : "hidden"
        }`}
      >
        <p>Projects</p>
        <p>Blog</p>
        <p>Contact Us</p>
      </div>
    </div>
  );
};
