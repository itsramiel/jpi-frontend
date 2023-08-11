import "../globals.css";
import type { Metadata } from "next";
import { LocaleSegmentProps } from "./type";
import { Navbar } from "./components";

export const metadata: Metadata = {
  title: "Home",
  description: "Homepage of Jokanda Property Investment",
};

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
} & LocaleSegmentProps) {
  return (
    <html lang={locale} dir={locale === "en" ? "ltr" : "rtl"}>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
