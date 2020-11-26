
import React from 'react';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import './CurrencyField.css';

const defaultNumberMask = {
  prefix: '$',
  suffix: '',
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: ',',
  allowDecimal: true,
  decimalSymbol: '.',
  decimalLimit: 2, // how many digits allowed after the decimal
  integerLimit: 7, // limit length of integer numbers
  allowNegative: false,
  allowLeadingZeroes: false,
};

const CurrencyField = ({ ...inputProps }) => {
  const currencyMask = createNumberMask(defaultNumberMask);

  return <MaskedInput className="numberInput" mask={currencyMask} {...inputProps}/>;
}

export default CurrencyField;