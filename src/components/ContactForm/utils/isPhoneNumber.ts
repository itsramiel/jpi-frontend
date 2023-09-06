export function isPhoneNumber(number: string) {
  return /^(\+?\d{1,3}[-.\s]?)?(\(?\d{1,5}?\)?[-.\s]?)?\d{1,5}[-.\s]?\d{1,9}$/.test(
    number
  );
}
