import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  basketItems: [] as {
    productId: number;
    quantity: number;
  }[],
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const productInBasket = state.basketItems.findIndex(
        (p) => p.productId === product.productId
      );
      if (productInBasket > -1) {
        state.basketItems[productInBasket].quantity =
          state.basketItems[productInBasket].quantity + action.payload.quantity;
      } else {
        state.basketItems = [
          ...state.basketItems,
          { productId: product.productId, quantity: action.payload.quantity },
        ];
      }
    },
    removeOneFromCart: (state, action) => {
      const product = action.payload;
      const productInBasket = state.basketItems.findIndex(
        (p) => p.productId === product.productId
      );
      if (
        productInBasket > -1 &&
        state.basketItems[productInBasket].quantity > 1
      ) {
        state.basketItems[productInBasket].quantity--;
      }
    },
    removeFromCart: (state, action) => {
      state.basketItems = state.basketItems.filter(
        (product) => product.productId !== action.payload.productId
      );
    },
    applyBasketToCart: (state, action) => {
      state.basketItems = action.payload.basket;
      state.basketItems = action.payload.basket.map(
        (item: { productId: number; quantity: number }) => {
          return { productId: item.productId, quantity: item.quantity };
        }
      );
    },
    clearBasket: (state) => {
      state.basketItems = [];
    },
    hideLoading: (state) => {
      state.loading = false;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearBasket,
  removeOneFromCart,
  applyBasketToCart,
  hideLoading,
} = basketSlice.actions;
export default basketSlice.reducer;
