export function formatCurrency({
  value,
  locale,
  currency,
}: {
  value: number;
  locale: string;
  currency: string;
}) {
  return Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 0,
  }).format(value);
}
