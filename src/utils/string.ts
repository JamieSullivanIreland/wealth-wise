export const camelCase = (str: string) => {
  if (!str) return;
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
};

export const currencyFormat = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'EUR',
});

export const getEuropeanYear = (date: Date) => {
  if (!date) return;
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear().toString().substring(2)}`;
};
