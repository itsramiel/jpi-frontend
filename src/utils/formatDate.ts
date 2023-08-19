export const formatDate = (date: Date, locale: string) => {
  return Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
};
