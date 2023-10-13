export function formatCurrency({
  value,
  locale,
}: {
  value: number;
  locale: string;
}) {
  return Intl.NumberFormat(locale, {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(value);
}
