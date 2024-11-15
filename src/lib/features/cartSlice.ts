"use client";

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Variant {
  variant_type: "brand" | "size" | "color";
  value: string;
  price: number;
}

export interface Product {
  quantity: number;
  price: number;
  subprice: number;
  productid: string;
  coverimage: string;
  name: string;
  prescription: boolean;
  variant: Variant[];
}
export interface Order {
  userid: string;
  total_amount: number;
  delivery_fee: number;
  prescription_needed: boolean;
  couponid: string | null;
  coupon_used: boolean;
  trackingid: string;
  items: Product[];
  addressid: string;
  report: [{ name: string; upload: string }];
  nin: string;
}

export interface CartState {
  cart: Product[];
}
const initialState: CartState = {
  cart: [],
};
export const CartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.cart.find(
        (item) => item.productid === action.payload.productid,
      );
      if (existingItem) {
        state.cart = state.cart.map((item) =>
          item.productid === action.payload.productid
            ? { ...item, quantity: action.payload.quantity }
            : item,
        );
      } else {
        state.cart = [...state.cart, { ...action.payload }];
      }
    },

    decrement: (state, action: PayloadAction<Product>) => {
      const existingItem = state.cart.find(
        (item) => item.productid === action.payload.productid,
      );
      if (existingItem) {
        state.cart = state.cart.map((item) =>
          item.productid === action.payload.productid
            ? { ...item, quantity: action.payload.quantity }
            : item,
        );
      } else {
        state.cart = [...state.cart, { ...action.payload }];
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter(
        (item) => item.productid !== action.payload,
      );
    },

    clearCart: (state) => {
      state.cart = [];
    },
    setCart: (state, action: PayloadAction<Product[]>) => {
      state.cart = action.payload;
    },
    filterCart: (state) => {
      state.cart = state.cart.filter((item) => item.quantity > 0);
    },
  },
});

export const { addToCart, decrement, setCart, clearCart, filterCart } =
  CartSlice.actions;
export default CartSlice.reducer;
