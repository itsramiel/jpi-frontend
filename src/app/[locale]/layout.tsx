import "../globals.css";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocaleSegmentProps } from "./type";
import { Footer, Navbar } from "./components";
import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";

export const metadata: Metadata = {
  title: "Home",
  description: "Homepage of Jokanda Property Investment",
};

export async function generateStaticParams() {
  const locales = ["en", "ar"];

  return locales.map((locale) => ({ locale }));
}

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

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <html lang={locale} dir={locale === "en" ? "ltr" : "rtl"}>
        <body>
          <div className="max-w-6xl mx-auto px-4">
            <Navbar />
            {children}
          </div>
          <Footer />
        </body>
      </html>
    </NextIntlClientProvider>
  );
}
