import moment from "moment";

const isNumeric = (value: string): boolean => /^\d+$/.test(value);
const isAlpha = (value: string): boolean => /^[A-Za-z\s]+$/.test(value);

export const isCardValid = (card: string): boolean => {
  const luhnArr = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];
  let length = card.length;

  let bit = 1;
  let sum = 0;

  while (length) {
    const valueCheck = parseInt(card.charAt(--length), 10);
    sum += (bit ^= 1) ? luhnArr[valueCheck] : valueCheck;
  }
  return !!sum && sum % 10 === 0;
};

export const isVisa = (card: string): boolean =>
  !!card && card.startsWith("4") && (card.length === 13 || card.length === 16);

export const isMastercard = (card: string): boolean =>
  !!card && card.startsWith("5") && card.length === 16;

export const isAmerican = (card: string): boolean =>
  !!card &&
  (card.startsWith("34") || card.startsWith("37")) &&
  card.length === 15;

export const isDiscover = (card: string): boolean =>
  !!card && card.startsWith("6") && card.length === 16;

export const isCardAccept = (card: string): boolean =>
  isVisa(card) || isMastercard(card) || isAmerican(card) || isDiscover(card);

export const isCvvValid = (cvv: string, card: string): boolean => {
  const isValidCVVAmex = isAmerican(card) && cvv.length === 4;
  const isValidCVVNotAmex = !isAmerican(card) && cvv.length === 3;

  return isNumeric(cvv) && (isValidCVVAmex || isValidCVVNotAmex);
};

export const isDateValid = (date: string) => {
  const expirationDateFormated = moment(date, "MM/YY").endOf("month");
  if (!expirationDateFormated.isValid()) return false;
  return expirationDateFormated.isAfter(moment(moment.now()));
};

export const isNameValid = (value: string) =>
  value.length >= 2 && value.length <= 255 && isAlpha(value);
