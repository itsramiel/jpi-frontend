import { LocaleSegmentProps } from "./type";

export async function generateStaticParams() {
  const locales = ["en", "ar"];

  return locales.map((locale) => ({ locale }));
}

export default function Home({ params: { locale } }: LocaleSegmentProps) {
  return <h1>Hello {locale}</h1>;
}
