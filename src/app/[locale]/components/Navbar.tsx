"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { IoCloseSharp, IoMenuSharp } from "react-icons/io5";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const t = useTranslations("labels");

  return (
    <div className="flex px-4 justify-between items-center relative max-w-6xl mx-auto">
      <Image
        src={require("../../../../public/jpi-logo-optimized.png")}
        alt="logo"
        width={40}
        height={40}
      />
      <button className="sm:hidden" onClick={() => setIsOpen((prev) => !prev)}>
        {isOpen ? <IoCloseSharp size={24} /> : <IoMenuSharp size={24} />}
      </button>
      <div
        className={` p-3 sm:p-0 flex-col sm:flex-row font-semibold gap-4 text-gray-700 absolute right-0 left-0 top-full sm:static border-t sm:border-0 border-t-gray-300 ${
          isOpen ? "flex" : "hidden"
        } sm:flex`}
      >
        <p>{t("projects")}</p>
        <p>{t("blog")}</p>
        <p>{t("contactUs")}</p>
      </div>
    </div>
  );
};
