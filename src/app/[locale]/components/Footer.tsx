/*eslint i18next/no-literal-string: 0*/

import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoLinkedin,
} from "react-icons/io5";
import Link from "next-intl/link";
import classNames from "classnames";
import { useTranslations } from "next-intl";

interface FooterProps {
  className?: string;
}
export function Footer({ className }: FooterProps) {
  const t = useTranslations("labels");
  return (
    <footer
      className={classNames(
        "flex justify-center p-4 md:py-8 bg-gray-50 border-t border-gray-950/10",
        className
      )}
    >
      <div className="max-w-6xl text-gray-700 text-sm flex-1 flex justify-between">
        <div className="flex flex-col justify-between">
          <p className="font-semibold">{t("companyName")}</p>
          <div className="flex flex-row flex-wrap gap-2">
            <Link href="#">
              <IoLogoInstagram />
            </Link>
            <Link href="#">
              <IoLogoFacebook />
            </Link>
            <Link href="#">
              <IoLogoLinkedin />
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-2 [&_a]:text-gray-600 [&_a:hover]:text-gray-800 font-medium">
          <Link href="/projects">{t("projects")}</Link>
          <Link href="/blog">{t("blog")}</Link>
          <Link href="/contact">{t("contactUs")}</Link>
        </div>
      </div>
    </footer>
  );
}
