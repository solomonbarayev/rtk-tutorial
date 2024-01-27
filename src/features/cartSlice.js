import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { openModal } from './modalSlice';

const url = 'https://course-api.com/react-useReducer-cart-project';

export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (_, thunkApi) => {
    try {
      const { data } = await axios(url);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue('something went wrong');
    }
  }
);

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    increase: (state, { payload }) => {
      state.cartItems = state.cartItems.map((cartItem) => {
        if (cartItem.id === payload.id) {
          return { ...cartItem, amount: cartItem.amount + 1 };
        }
        return cartItem;
      });
    },
    decrease: (state, { payload }) => {
      state.cartItems = state.cartItems.map((cartItem) => {
        if (cartItem.id === payload.id) {
          return { ...cartItem, amount: cartItem.amount - 1 };
        }
        return cartItem;
      });
    },
    removeItem: (state, { payload }) => {
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== payload.id
      );
    },
    calculateTotals: (state) => {
      let { total, amount } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, amount } = cartItem;
          const itemTotal = price * amount;
          cartTotal.total += itemTotal;
          cartTotal.amount += amount;
          return cartTotal;
        },
        {
          total: 0,
          amount: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.total = total;
      state.amount = amount;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCartItems.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCartItems.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.cartItems = payload;
    });
    builder.addCase(getCartItems.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
    });
  },
});

export const { clearCart, increase, decrease, removeItem, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
