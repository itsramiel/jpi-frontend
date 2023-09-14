import { Button } from "@/components/ContactForm/components";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { IconType } from "react-icons";
import {
  IoArrowForwardSharp,
  IoBarChartOutline,
  IoBulbOutline,
  IoMapOutline,
  IoSearchOutline,
} from "react-icons/io5";

export default function Home() {
  const t = useTranslations("homepage");
  return (
    <div className="px-4 py-9 md:py-24 xl:py-36 flex flex-col gap-9 md:gap-16 xl:gap-24">
      <InvestInProjects />
      <Seperator />
      <ExploreCountry />
      <Seperator />
      <SellingPoints />
      <Seperator />
      <div className="flex flex-col gap-4">
        <h2 className="text-gray-900 text-center text-2xl font-medium">
          {t("partneringTitle")}
        </h2>
        <div className="flex flex-row flex-wrap justify-center gap-4 items-center">
          <Image
            src={require("@/../public/partners/dovec-logo-light.png")}
            alt={t("dovecAlt")}
            className="w-[6.25rem] object-contain"
          />
          <Image
            src={require("@/../public/partners/noyanlar-logo-light.png")}
            alt={t("noyanlarAlt")}
            className="w-[6.25rem] object-contain"
          />
        </div>
      </div>
    </div>
  );
}

function Seperator() {
  return <hr className="border-gray-950/10 border" />;
}

function InvestInProjects() {
  const t = useTranslations("homepage");
  return (
    <div className="flex flex-col md:flex-row gap-9 md:gap-24 items-center">
      <div className="md:flex-1 flex flex-col gap-6 items-center">
        <div className="flex flex-col gap-4">
          <h2 className="text-gray-900 text-center text-4xl font-semibold">
            {t("investTitle")}
          </h2>
          <p className="text-gray-600 text-center text-base font-medium">
            {t("investDescription")}
          </p>
        </div>
        <Button trailingIcon={IoArrowForwardSharp}>
          {t("premiumPropertyButton")}
        </Button>
      </div>
      <div className="md:flex-1 flex flex-col gap-2 self-stretch md:self-auto">
        <div className="bg-red-600 w-full aspect-[3/2] rounded"></div>
        <div className="flex gap-2">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <div
                className={`h-1 flex-1 rounded-[1px] ${index === 0 ? "bg-gray-800" : "bg-gray-800/30"
                  }`}
                key={index}
              ></div>
            ))}
        </div>
      </div>
    </div>
  );
}

function ExploreCountry() {
  const t = useTranslations("homepage");
  return (
    <div className="flex flex-col md:flex-row-reverse items-center gap-9 md:gap-24">
      <div className="md:flex-1 flex flex-col gap-4">
        <h2 className="text-gray-900 text-center text-4xl font-semibold">
          {t("discoverTitle")}
        </h2>
        <p className="text-gray-600 text-center text-base font-medium">
          {t("discoverDescription")}
        </p>
      </div>
      <div className="md:flex-1 flex flex-col gap-2 self-stretch">
        <div className="bg-red-600 w-full aspect-[3/2] rounded"></div>
        <div className="flex gap-2">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <div
                className={`h-1 flex-1 rounded-[1px] ${index === 0 ? "bg-gray-800" : "bg-gray-800/30"
                  }`}
                key={index}
              ></div>
            ))}
        </div>
      </div>
    </div>
  );
}

function SellingPoints() {
  const t = useTranslations("homepage");
  return (
    <div className="flex flex-col gap-8 md:gap-16 xl:gap-24 items-center">
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-gray-900 text-center text-4xl font-semibold">
          {t("chooseTitle")}
        </h2>
        <div className="flex flex-col gap-4 max-w-3xl">
          <div className="flex gap-2">
            <SellingPoint
              icon={IoBarChartOutline}
              title={t("insightsTitle")}
              subtitle={t("insightsDescription")}
            />
            <SellingPoint
              icon={IoMapOutline}
              title={t("expertiseTitle")}
              subtitle={t("expertiseDescription")}
            />
          </div>
          <div className="flex gap-2">
            <SellingPoint
              icon={IoBulbOutline}
              title={t("guidanceTitle")}
              subtitle={t("guidanceDescription")}
            />
            <SellingPoint
              icon={IoSearchOutline}
              title={t("transparencyTitle")}
              subtitle={t("transparencyDescription")}
            />
          </div>
        </div>
      </div>
      <Button trailingIcon={IoArrowForwardSharp}>
        {t("consultationButton")}
      </Button>
    </div>
  );
}

interface SellingPointProps {
  icon: IconType;
  title: string;
  subtitle: string;
}
function SellingPoint({ icon: Icon, title, subtitle }: SellingPointProps) {
  return (
    <div className="flex-1 flex flex-col gap-2">
      <Icon className="text-gray-700 mirror" />
      <p className="text-gray-600">
        <span className="text-gray-700 font-semibold">{title}</span>
        {subtitle}
      </p>
    </div>
  );
}
