import Image from "next/image";
import Link from "next-intl/link";
import { useTranslations } from "next-intl";
import { LanguageControl } from "./Navbar/components";

export const Navbar = () => {
  const t = useTranslations("labels");

  return (
    <div className="p-4 border-b border-b-black/10">
      <div className="max-w-6xl mx-auto flex justify-between">
        <div className="flex flex-row gap-9 items-center">
          <Link href={"/"} className="cursor-pointer">
            <Image src={"/Logo.png"} alt="logo" width={31.18} height={20} />
          </Link>
          <div className={"flex flex-row gap-9 text-gray-700 font-medium"}>
            <Link href={"/projects"} className="cursor-pointer">
              {t("projects")}
            </Link>
            <Link href={"/blog"} className="cursor-pointer">
              {t("blog")}
            </Link>
            <Link href={"/contact"} className="cursor-pointer">
              {t("contactUs")}
            </Link>
          </div>
        </div>
        <LanguageControl />
      </div>
    </div>
  );
};
