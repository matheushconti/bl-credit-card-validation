import {
  isAmerican,
  isCardAccept,
  isCardValid,
  isCvvValid,
  isDateValid,
  isDiscover,
  isMastercard,
  isNameValid,
  isVisa,
} from "@utils";
import moment from "moment";

const americanCard = "371449635398431";
const discoverCard = "6011000990139424";
const masterCard = "5555555555554444";
const visaCard = "4242424242424242";
const dinersCard = "30569309025904";
const invalidCard = "999999999999999";

describe("Card Validation", () => {
  // Card Valid and Accepted
  test("it should be valid Credit Card Number", () => {
    expect(isCardValid(dinersCard)).toBe(true);
  });
  test("it should NOT be valid Credit Card Number", () => {
    expect(isCardValid(invalidCard)).toBe(false);
  });
  test("it should be accepted Credit Card Number", () => {
    expect(isCardAccept(americanCard)).toBe(true);
  });
  test("it should NOT be accepted Credit Card Number", () => {
    expect(isCardAccept(dinersCard)).toBe(false);
  });

  // Card American Express
  test("it should be American Express Card", () => {
    expect(isAmerican(americanCard)).toBe(true);
  });
  test("it should NOT be American Express Card", () => {
    expect(isAmerican(masterCard)).toBe(false);
  });

  // Card Discover
  test("it should be Discover Card", () => {
    expect(isDiscover(discoverCard)).toBe(true);
  });
  test("it should NOT be Discover Card", () => {
    expect(isDiscover(americanCard)).toBe(false);
  });

  // Card MasterCard
  test("it should be Master Card", () => {
    expect(isMastercard(masterCard)).toBe(true);
  });
  test("it should NOT be Master Card", () => {
    expect(isMastercard(americanCard)).toBe(false);
  });

  // Card Visa
  test("it should be Visa Card", () => {
    expect(isVisa(visaCard)).toBe(true);
  });
  test("it should NOT be Visa Card", () => {
    expect(isVisa(americanCard)).toBe(false);
  });

  // Expiration Date
  test("it should be valid and future Expiration Date", () => {
    // get year to make sure is always future
    const year = moment().add(1, "years").format("YY");
    expect(isDateValid(`04/${year}`)).toBe(true);
  });
  test("it should NOT be valid Expiration Date", () => {
    expect(isDateValid("13/35")).toBe(false);
  });
  test("it should be past Expiration Date", () => {
    // get year to make sure is always in the past
    const year = moment().subtract(1, "years").format("YY");
    expect(isDateValid(`04/${year}`)).toBe(false);
  });

  // CVV
  test("it should be valid CVV for non American Express Card", () => {
    expect(isCvvValid("123", visaCard)).toBe(true);
  });
  test("it should NOT be valid CVV", () => {
    expect(isCvvValid("12", visaCard)).toBe(false);
  });
  test("it should be valid CVV for American Express Card", () => {
    expect(isCvvValid("1234", americanCard)).toBe(true);
  });
  test("it should NOT be valid CVV for American Express Card", () => {
    expect(isCvvValid("123", americanCard)).toBe(false);
  });

  //Name
  test("it should be valid First/Last Name", () => {
    expect(isNameValid("Matheus Conti")).toBe(true);
  });
  test("it should NOT be valid First/Last Name", () => {
    expect(isNameValid("Conti!")).toBe(false);
  });
});
