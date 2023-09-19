import {
  IoArrowForwardSharp,
  IoBarChartOutline,
  IoBulbOutline,
  IoMapOutline,
  IoSearchOutline,
} from "react-icons/io5";
import qs from "qs";
import Image from "next/image";
import Link from "next-intl/link";
import { IconType } from "react-icons";
import { useTranslations } from "next-intl";

import { Button } from "@/components";
import { BasePageProps } from "@/types";

import { TProject } from "./types";
import { ProjectsCarousel, DiscoverCarousel } from "./components";

type TResponse = {
  data: Array<TProject>;
};

export default async function Page({ params: { locale } }: BasePageProps) {
  const query = qs.stringify(
    {
      populate: "images",
      fields: ["name", "city"],
      locale,
    },
    { encode: false }
  );

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/projects?${query}`,
    { cache: "no-store" }
  );

  const { data } = (await response.json()) as TResponse;

  return <HomePage data={data} />;
}

interface HomePageProps {
  data: TResponse["data"];
}
function HomePage({ data }: HomePageProps) {
  const t = useTranslations("homepage");
  return (
    <div className="px-4 py-9 md:py-24 xl:py-36 flex flex-col gap-9 md:gap-16 xl:gap-24">
      <InvestInProjects data={data} />
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
            src={"/partners/dovec-logo-light.png"}
            alt={t("dovecAlt")}
            width={100}
            height={36}
            className="w-[6.25rem] object-contain"
          />
          <Image
            src={"/partners/noyanlar-logo-light.png"}
            alt={t("noyanlarAlt")}
            width={100}
            height={23}
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

interface InvestInProjectsProps {
  data: TResponse["data"];
}
function InvestInProjects({ data }: InvestInProjectsProps) {
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
        <Link href="/projects">
          <Button trailingIcon={IoArrowForwardSharp}>
            {t("premiumPropertyButton")}
          </Button>
        </Link>
      </div>
      <ProjectsCarousel data={data} />
    </div>
  );
}

function ExploreCountry() {
  const t = useTranslations("homepage");
  let images = [
    {
      name: "datingscout-KKsG0nU7e4E-unsplash.jpg",
      alt: t("discover.imagesAlts.famagustaCoast"),
    },
    {
      name: "katerina-bot-2ezMjZRw_tI-unsplash.jpg",
      alt: t("discover.imagesAlts.harbor"),
    },
    {
      name: "emediong-umoh-FDAP2v2u3CA-unsplash.jpg",
      alt: t("discover.imagesAlts.girneHighway"),
    },
    {
      name: "emediong-umoh-TSnBLv1VpM0-unsplash.jpg",
      alt: t("discover.imagesAlts.aerialLake"),
    },
    {
      name: "emediong-umoh-LktLUKQ6YqY-unsplash.jpg",
      alt: t("discover.imagesAlts.sportCourts"),
    },
    {
      name: "emediong-umoh-XH-fivqZp3w-unsplash.jpg",
      alt: t("discover.imagesAlts.colorFestival"),
    },
    {
      name: "emediong-umoh-wVvO_31f1O4-unsplash.jpg",
      alt: t("discover.imagesAlts.aerialFamagusta"),
    },
  ];

  images = images.map((image) => {
    image.name = `/explore/${image.name}`;
    return image;
  });

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
      <DiscoverCarousel images={images} />
    </div>
  );
}

function SellingPoints() {
  const t = useTranslations("homepage");
  return (
    <div className="flex flex-col gap-9 md:gap-16 xl:gap-24 items-center">
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
      <Link href="/contact">
        <Button trailingIcon={IoArrowForwardSharp}>
          {t("consultationButton")}
        </Button>
      </Link>
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
      <p className="text-gray-600 font-medium">
        <span className="text-gray-700 font-semibold">{title}</span>
        {subtitle}
      </p>
    </div>
  );
}
