"use client";

import { ContactForm } from "@/components";
import { useTranslations } from "next-intl";
import { IoCallSharp, IoMailSharp } from "react-icons/io5";

export default function Contact() {
  const t = useTranslations("conatct");

  return (
    <div className="flex flex-col lg:flex-row gap-8 my-16">
      <main className="flex flex-1 flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-gray-950 text-4xl font-bold">
            {t("form.title")}
          </h1>
          <h2 className="text-gray-600 font-medium">{t("form.description")}</h2>
        </div>
        <ContactForm />
      </main>
      <aside className="flex flex-1 flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-gray-950 text-4xl font-bold">
            {t("ourContacts.title")}
          </h1>
          <h2 className="text-gray-600 font-medium">
            {t("ourContacts.description")}
          </h2>
        </div>
        <ul className="flex flex-col gap-1">
          {[
            { icon: IoCallSharp, text: "+905338811865" },
            { icon: IoMailSharp, text: "coolGuy@yolked.com" },
          ].map((item) => (
            <li key={item.text} className="flex items-center gap-3">
              <item.icon color="rgba(55, 65, 81, 1)" size={18} />
              <span className="text-gray-600">{item.text}</span>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
