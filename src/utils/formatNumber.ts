export function formatNumber({
  value,
  locale,
}: {
  value: number;
  locale: string;
}) {
  return Intl.NumberFormat(locale, {}).format(value);
}
