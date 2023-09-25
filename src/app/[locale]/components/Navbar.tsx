"use client";

import Image from "next/image";
import Link from "next-intl/link";
import { useTranslations } from "next-intl";
import type {} from "next-intl";
import { LanguageControl } from "./Navbar/components";
import { IoClose, IoMenu } from "react-icons/io5";
import classNames from "classnames";
import { CSSProperties, useEffect, useState } from "react";

const LINKS = [
  { key: "projects", route: "/projects" },
  { key: "blog", route: "/blog" },
  { key: "contactUs", route: "/contact" },
] as const;

const NAV_CONTAINER_DURATION = 100;
const LINK_DURATION = 100;
const TOTAL_ANIMATION = 100 + LINKS.length * 100;

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("labels");

  useEffect(() => {
    document.querySelector("body")?.classList.toggle("overflow-hidden", isOpen);
  }, [isOpen]);

  return (
    <div className="fixed left-0 right-0 top-0 backdrop-blur-lg h-[--navbar-height] px-4 border-b border-b-black/10 z-10">
      <div className="h-full max-w-6xl mx-auto flex justify-between">
        <div className="flex flex-row gap-9 items-center">
          <Link href={"/"} className="cursor-pointer flex-shrink-0">
            <Image
              src={"/Logo.png"}
              alt="logo"
              width={31.18}
              height={20}
              className="w-[1.94875rem] h-[1.25rem]"
            />
          </Link>
          <div
            style={
              {
                "--delay": `${isOpen ? 0 : TOTAL_ANIMATION}ms`,
              } as CSSProperties
            }
            className={classNames(
              "transition-[visibility] duration-0 md:visible md:transition-none",
              isOpen
                ? "visible delay-[var(--delay)]"
                : "invisible delay-[var(--delay)]"
            )}
          >
            <div
              style={
                {
                  "--duration": `${NAV_CONTAINER_DURATION}ms`,
                  "--delay": `${
                    isOpen ? 0 : TOTAL_ANIMATION - NAV_CONTAINER_DURATION
                  }ms`,
                } as CSSProperties
              }
              className={classNames(
                "transition-opacity duration-[var(--duration)] md:transition-none md:opacity-100",
                isOpen
                  ? "opacity-100 delay-[var(--delay)]"
                  : "opacity-0 delay-[var(--delay)]",
                "flex flex-col md:flex-row md:gap-9 absolute left-0 right-0  md:static p-4 md:p-0 top-[calc(100%+1px)] h-[calc(100vh-var(--navbar-height))] md:h-auto bg-white md:bg-transparent"
              )}
            >
              {LINKS.map((link, index) => (
                <Link
                  key={link.key}
                  href={link.route}
                  style={
                    {
                      "--duration": `${LINK_DURATION}ms`,
                      "--delay": isOpen
                        ? `${100 + index * 100}ms`
                        : `${(LINKS.length - 1 - index) * 100}ms`,
                    } as CSSProperties
                  }
                  className={classNames(
                    "cursor-pointer font-medium text-gray-700 border-b border-b-gray-100 md:border-none py-3 md:py-0",
                    isOpen
                      ? "translate-y-0 opacity-100 delay-[var(--delay)]"
                      : "translate-y-1 opacity-0 delay-[var(--delay)]",
                    "transition-[opacity,transform] duration-[var(--duration)] md:transition-none md:translate-y-0 md:opacity-100"
                  )}
                >
                  {t(link.key)}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 h-full">
          <LanguageControl />
          <button
            className="h-full px-2 text-gray-700 md:hidden [&_svg]:w-5 [&_svg]:h-5"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? <IoClose /> : <IoMenu />}
          </button>
        </div>
      </div>
    </div>
  );
};
