import { Button } from "@/components";
import { useTranslations } from "next-intl";
import { IoArrowForwardSharp } from "react-icons/io5";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <div className="w-full h-full px-4 flex-1 flex flex-col items-center justify-center gap-12">
      <div className="text-center flex flex-col gap-3">
        <h3 className="text-gray-950 text-4xl font-semibold">{t("title")}</h3>
        <p className="text-gray-600">{t("subtitle")}</p>
      </div>
      <Button href="/projects" size="sm" trailingIcon={IoArrowForwardSharp}>
        {t("ctaButton")}
      </Button>
    </div>
  );
}
