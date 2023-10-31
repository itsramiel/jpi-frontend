import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslator } from "next-intl/server";
import { IoCallSharp, IoMailSharp } from "react-icons/io5";

import { ContactForm } from "@/components";
import { BasePageProps } from "@/types";

export async function generateMetadata({
  params,
}: BasePageProps): Promise<Metadata> {
  const t = await getTranslator(params.locale, "contact.form");

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${params.locale}/contact`,
    },
  };
}

export default function Contact() {
  const t = useTranslations("contact");

  return (
    <div className="w-full max-w-6xl mx-auto px-4 pt-[var(--navbar-height)] flex flex-col lg:flex-row gap-8 my-16">
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
            { icon: IoCallSharp, text: "+905428594054" },
            { icon: IoMailSharp, text: "contact@jokanda.com" },
          ].map((item) => (
            <li key={item.text} className="flex items-center gap-3">
              <item.icon
                color="rgba(55, 65, 81, 1)"
                size={18}
                className="mirror"
              />
              <span className="text-gray-600">{item.text}</span>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
