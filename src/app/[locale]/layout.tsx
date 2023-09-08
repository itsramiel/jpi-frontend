export const revalidate = 0;
import "../globals.css";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocaleSegmentProps } from "./type";
import { Navbar } from "./components";
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
    <html lang={locale} dir={locale === "en" ? "ltr" : "rtl"}>
      <body className="max-w-6xl mx-auto px-4">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
