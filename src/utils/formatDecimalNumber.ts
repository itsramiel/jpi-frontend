export function formatDecimalNumber(number: number, locale: string) {
  return new Intl.NumberFormat(locale).format(number);
}
