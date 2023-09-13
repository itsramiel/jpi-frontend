/*eslint i18next/no-literal-string: 0*/

import { Button } from "@/components/ContactForm/components";
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
  return (
    <div className="px-4 py-9 flex flex-col gap-9">
      <div className="flex flex-col gap-8 items-center">
        <div className="flex flex-col gap-4">
          <h2 className="text-gray-900 text-center text-4xl font-semibold">
            Invest in Northern Cyprus Real Estate like a Professional
          </h2>
          <p className="text-gray-600 text-center text-base font-medium">
            {
              "Jokanda Property Investment empowers investors with clarity and analytics in Northern Cyprus real estate. We're your guide to informed investing."
            }
          </p>
        </div>
        <div className="flex flex-col gap-2 self-stretch">
          <div className="bg-red-600 w-full aspect-[3/2] rounded"></div>
          <div className="flex gap-2">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <div
                  className={`h-1 flex-1 rounded-[1px] ${
                    index === 0 ? "bg-gray-800" : "bg-gray-800/30"
                  }`}
                  key={index}
                ></div>
              ))}
          </div>
        </div>
        <Button trailingIcon={IoArrowForwardSharp}>
          Our Premium Property Selection
        </Button>
      </div>
      <Seperator />
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col gap-4">
          <h2 className="text-gray-900 text-center text-4xl font-semibold">
            Discover Your Next Investment and Paradise
          </h2>
          <p className="text-gray-600 text-base font-medium text-center">
            From profit-driven real estate to peaceful living, Northern Cyprus
            offers the best of both worlds.
          </p>
        </div>
        <div className="flex flex-col gap-2 self-stretch">
          <div className="bg-red-600 w-full aspect-[3/2] rounded"></div>
          <div className="flex gap-2">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <div
                  className={`h-1 flex-1 rounded-[1px] ${
                    index === 0 ? "bg-gray-800" : "bg-gray-800/30"
                  }`}
                  key={index}
                ></div>
              ))}
          </div>
        </div>
      </div>
      <Seperator />
      <div className="flex flex-col gap-8 items-center">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-gray-900 text-center text-4xl font-semibold">
            Why choose Jokanda?
          </h2>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <SellingPoint
                icon={IoBarChartOutline}
                title="Data-Driven Insights."
                subtitle="Beyond the surface with deep-dive numbers to guide your investments."
              />
              <SellingPoint
                icon={IoMapOutline}
                title="Local Expertise."
                subtitle="An adept understanding of the Northern Cyprus market with the latest trends at our fingertips."
              />
            </div>
            <div className="flex gap-2">
              <SellingPoint
                icon={IoBulbOutline}
                title="Personalized Guidance."
                subtitle="Tailored recommendations to align with your unique investment goals."
              />
              <SellingPoint
                icon={IoSearchOutline}
                title="Transparency."
                subtitle="Complete clarity every step of your journey, ensuring informed decisions."
              />
            </div>
          </div>
        </div>
        <Button trailingIcon={IoArrowForwardSharp}>
          Schedule a Free Consultation
        </Button>
      </div>
      <Seperator />
      <div className="flex flex-col gap-4">
        <h2 className="text-gray-900 text-center text-2xl font-medium">
          Partnering with the pioneers of Northern Cyprus Construction
        </h2>
        <div className="flex flex-row justify-center gap-4 items-center">
          <Image
            src={require("@/../public/partners/dovec-logo-light.png")}
            alt="dovec logo"
            className="w-[6.25rem] object-contain"
          />
          <Image
            src={require("@/../public/partners/noyanlar-logo-light.png")}
            alt="noyanlar logo"
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

interface SellingPointProps {
  icon: IconType;
  title: string;
  subtitle: string;
}
function SellingPoint({ icon: Icon, title, subtitle }: SellingPointProps) {
  return (
    <div className="flex-1 flex flex-col gap-2">
      <Icon className="text-gray-700" />
      <p className="text-gray-600">
        <span className="text-gray-700 font-semibold">{title}</span>
        {subtitle}
      </p>
    </div>
  );
}
