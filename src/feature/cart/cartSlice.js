import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
};

const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('cart')) || defaultState;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: getCartFromLocalStorage(),
  reducers: {
    addItem: (state, action) => {
      //console.log(action.payload);
      // this is the object payload that came from addtocart btn
      const { product } = action.payload; // product: cartProduct
      // check incoming data if it exist on the state.cartItems
      const item = state.cartItems.find((i) => i.cartID === product.cartID);
      // if true add the amount
      if (item) {
        item.amount += product.amount;
      } else {
        // else push to cartItems as a new item
        state.cartItems.push(product);
        //state.cartItems.push({ ...product, unitPrice: product.price });
      }
      // update all states
      // if item is there skip push then update current numItemsInCart
      // numItemsInCart plus the product.amount
      state.numItemsInCart += product.amount;
      state.cartTotal += product.price * product.amount;
      // caseReducers
      // this call caseReducers within the slice:
      // or use a reducer inside another reducer
      cartSlice.caseReducers.calculateTotals(state);
      toast.success('Item added to cart');
    },
    clearItem: (state) => {
      // set back to default
      localStorage.setItem('cart', JSON.stringify(defaultState));
      return defaultState;
    },
    removeItem: (state, action) => {
      const { cartID } = action.payload;
      //find the item/product that matches the cardID
      const product = state.cartItems.find((i) => i.cartID === cartID);
      // filter/remove from state.cartItems if callback expression is true
      // i.cartID does not equal to cartID
      state.cartItems = state.cartItems.filter((i) => i.cartID !== cartID);
      // calculte
      state.numItemsInCart -= product.amount;
      state.cartTotal -= product.price * product.amount;
      cartSlice.caseReducers.calculateTotals(state);
    },
    editItem: (state, action) => {
      const { cartID, amount } = action.payload;
      //find the item/product that matches the cardID
      const item = state.cartItems.find((i) => i.cartID === cartID);
      state.numItemsInCart += amount - item.amount;
      state.cartTotal += item.price * (amount - item.amount);
      item.amount = amount;

      //item.price = item.unitPrice * amount;
      // item.unitPrice = item.unitPrice * item.amount;
      // item.price = item.unitPrice * amount; // Use `unitPrice` to calculate the new pric
      cartSlice.caseReducers.calculateTotals(state);
      toast.success('Cart updated');
      // console.log(typeof item.amount, 'edititem');
      // console.log(typeof item.price, 'edititem');
    },
    calculateTotals: (state) => {
      state.tax = 0.1 * state.cartTotal;
      state.orderTotal = state.cartTotal + state.shipping + state.tax;
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

export const { addItem, clearItem, removeItem, editItem } = cartSlice.actions;

export default cartSlice.reducer;
