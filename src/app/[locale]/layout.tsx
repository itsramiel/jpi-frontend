import "../globals.css";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Noto_Naskh_Arabic } from "next/font/google";
import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";

import { LocaleSegmentProps } from "./types";
import { DirectionProvider, Footer, Navbar } from "./components";

const rtlFont = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Home",
  description: "Homepage of Jokanda Property Investment",
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
} & LocaleSegmentProps) {
  let messages: AbstractIntlMessages | undefined;

  try {
    messages = (await import(`../../translations/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  const dir = locale === "en" ? "ltr" : "rtl";

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <DirectionProvider dir={dir}>
        <html
          lang={locale}
          dir={dir}
          className={dir === "rtl" ? rtlFont.className : undefined}
        >
          <body className="min-h-screen flex flex-col">
            <Navbar />
            {children}
            <Footer className="mt-auto" />
          </body>
        </html>
      </DirectionProvider>
    </NextIntlClientProvider>
  );
}
