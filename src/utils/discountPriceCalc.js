export const discPriceCalc = (price, discount = 0) =>
  price - (discount * price) / 100;
