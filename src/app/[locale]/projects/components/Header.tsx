"use client";

import { useTranslations } from "next-intl";

export const Header = () => {
  const t = useTranslations("projects");
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-gray-950 text-4xl font-bold">{t("title")}</h1>
      <h2 className="text-gray-600 font-medium">{t("description")}</h2>
    </div>
  );
};
