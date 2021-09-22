import valid from "card-validator";
import getStorageValue from "./getStorageValue";

export default async function validateInfo(values) {
  let errors = {
    status: "error",
    message: 'An unknown error occured. Please try again later',
    ccountry: false,
    cname: false,
    cnumber: false,
    cexp: false,
    ccvc: false,
  };
  let bannedCountries = await getStorageValue('bannedCountries', []);
  let creditCard = {};

  creditCard.number = valid.number(values.cardNumber);
  creditCard.expirationDate = valid.expirationDate(values.cardExpiry);
  creditCard.cvc = valid.cvv(values.cardCVC);
  creditCard.cardholderName = valid.cardholderName(values.cardName);

  //Card CVC Verification
  if (values.cardCVC === null || !values.cardCVC.trim()) {
    errors.message = "Credit card CVC is not complete";
  } else if (creditCard.cvc.isValid) {
    errors.ccvc = true;
  } else {
    errors.message = "Credit card CVC is invalid";
  }

  //Card Expiration Verification
  if (values.cardExpiry === null || !values.cardExpiry.trim()) {
    errors.message = "Credit card expiration date is not complete";
  } else if (creditCard.expirationDate.isValid) {
    errors.cexp = true;
  } else {
    errors.message = "Credit card expiration date is invalid";
  }

  //Card Number Verification
  if (values.cardNumber === null || !values.cardNumber.trim()) {
    errors.message = "Credit card number is not complete";
  } else if (creditCard.number.isValid) {
    errors.cnumber = true;
  } else {
    errors.message = "Credit card number is invalid";
  }

  //Cardholder Name Verification
  if (values.cardName === null || !values.cardName.trim()) {
    errors.message = "Cardholder name is not complete";
  } else if (creditCard.cardholderName.isValid) {
    errors.cname = true;
  } else {
    errors.message = "Cardholder name is invalid";
  }

  // Country Verification
  if (values.cardCountry === null || !values.cardCountry.trim()) {
    errors.message = 'Card Country is not selected';
  } else if (bannedCountries.includes(values.cardCountry)) {
    errors.message = 'The selected country is on the list of banned countries.'
  } else {
    errors.ccountry = true;
  }

  if (
    errors.ccountry &&
    errors.cname &&
    errors.cnumber &&
    errors.cexp &&
    errors.ccvc
  ) {
    errors.status = "success";
    errors.message = "Credit Card is valid";
  }

  return errors;
}