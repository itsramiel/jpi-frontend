"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next-intl/client";
import Image from "next/image";
import { useState } from "react";
import { IoCloseSharp, IoMenuSharp } from "react-icons/io5";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const t = useTranslations("labels");

  const onLinkClick = (route: string) => {
    setIsOpen(false);
    router.push(route);
  };

  return (
    <div className="flex justify-between items-center relative">
      <a onClick={() => onLinkClick("/")} className="cursor-pointer">
        <Image
          src={require("@/../public/jpi-logo-optimized.png")}
          alt="logo"
          width={40}
          height={40}
        />
      </a>
      <button className="sm:hidden" onClick={() => setIsOpen((prev) => !prev)}>
        {isOpen ? <IoCloseSharp size={24} /> : <IoMenuSharp size={24} />}
      </button>
      <div
        className={`bg-white p-3 sm:p-0 flex-col sm:flex-row font-semibold gap-4 text-gray-700 absolute right-0 left-0 top-full sm:static border-t sm:border-0 border-t-gray-300 ${
          isOpen ? "flex" : "hidden"
        } sm:flex`}
      >
        <a>{t("projects")}</a>
        <a onClick={() => onLinkClick("/blog")} className="cursor-pointer">
          {t("blog")}
        </a>
        <a onClick={() => onLinkClick("/contact")} className="cursor-pointer">
          {t("contactUs")}
        </a>
      </div>
    </div>
  );
};
