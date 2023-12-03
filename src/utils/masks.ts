interface MaskParams {
  oldValue?: string;
  newValue: string;
}

export type MaskFn = ({ oldValue, newValue }: MaskParams) => string;

export const onlyNumberMask: MaskFn = ({ oldValue, newValue }: MaskParams) => {
  if (oldValue && oldValue.length > newValue.length) {
    return newValue;
  }

  return newValue.replace(/\D+/, "");
};

export const emailMask: MaskFn = ({ oldValue, newValue }: MaskParams) => {
  if (oldValue && oldValue.length > newValue.length) {
    return newValue;
  }

  return newValue.toLowerCase();
};

export const cpfMask: MaskFn = ({ oldValue, newValue }: MaskParams) => {
  if (oldValue && oldValue.length > newValue.length) {
    return newValue;
  }

  return newValue
    .replace(/\D+/g, "")
    .slice(0, 11)
    .replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4")
    .replace(/(\d{2})(\d{3})(\d{3})(\d{4})$/, "$1.$2.$3/$4");
};

export const phoneMask: MaskFn = ({ oldValue, newValue }: MaskParams) => {
  if (oldValue && oldValue.length > newValue.length) {
    return newValue;
  }

  return newValue
    .replace(/\D+/g, "")
    .slice(0, 11)
    .replace(/^(\d{2})(\d{5})/g, "($1) $2-")
    .replace(/^(\d{4})/, "$1");
};

export const birthDateMask: MaskFn = ({ oldValue, newValue }: MaskParams) => {
  if (oldValue && oldValue.length > newValue.length) {
    return newValue;
  }

  const numericValue = newValue.replace(/\D/g, "");
  let formattedValue = "";
  for (let i = 0; i < numericValue.length; i++) {
    if (i === 2 || i === 4) {
      formattedValue += "/";
    }
    formattedValue += numericValue[i];
  }

  return formattedValue;
};

export const creditCardNumberMask: MaskFn = ({
  oldValue,
  newValue,
}: MaskParams) => {
  if (oldValue && oldValue.length > newValue.length) {
    return newValue;
  }

  return newValue
    .replace(/\D/g, "")
    .replace(/(\d{4})/g, "$1 ")
    .slice(0, 19);
};

export const creditCardExpirationMask: MaskFn = ({
  oldValue,
  newValue,
}: MaskParams) => {
  if (oldValue && oldValue.length > newValue.length) {
    return newValue;
  }

  const numericValue = newValue.replace(/\D/g, "").slice(0, 4);

  if (numericValue.length > 2) {
    const mm = numericValue.slice(0, 2);
    const yy = numericValue.slice(2);

    return `${mm}/${yy}`;
  } else {
    return numericValue;
  }
};

export const zipCodeMask: MaskFn = ({ oldValue, newValue }: MaskParams) => {
  if (oldValue && oldValue.length > newValue.length) {
    return newValue;
  }

  return newValue.replace(/\D+/g, "").replace(/^(\d{5})(\d{3})/g, "$1-$2");
};

export const creditCardNameMask: MaskFn = ({ newValue }: MaskParams) => {
  const uppercasedValue = newValue.toUpperCase();

  return uppercasedValue;
};
