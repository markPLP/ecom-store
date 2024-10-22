import axios from 'axios';
const productionUrl = 'https://strapi-store-server.onrender.com/api';

export const customFetch = axios.create({
  baseURL: productionUrl,
});

export const formatPrice = (price) => {
  let formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format((price / 100).toFixed(2)); // get 2 decimal point

  return formattedPrice;
};
//{ length: 20 }: Creates an array-like object with a length of 20, but without elements.
//(_, index): The map function provides two parameters: the value (which is unused in this case, hence _) and the index. The index starts at 0.
//index + 1: Transforms the 0-based index to the desired number sequence from 1 to 20.
export const generateAmountOptions = (number) => {
  return Array.from({ length: number }, (_, index) => {
    const amount = index + 1;
    return (
      <option key={amount} value={amount}>
        {amount}
      </option>
    );
  });
};
