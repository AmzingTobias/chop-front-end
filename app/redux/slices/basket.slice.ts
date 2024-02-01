import { TBasketEntry, addNewProductToBasket } from "@/app/data/basket";
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
      state.basketItems = action.payload.basket.map(
        (item: { productId: number; quantity: number }) => {
          return { productId: item.productId, quantity: item.quantity };
        }
      );
    },
    /**
     * Will apply the server side basket found in action if the local basket is empty, or the basket
     * in the action has at least one entry. Otherwise, it will upload the contents of its basket
     * to the server
     * @param state Current basket state
     * @param action Basket contents to apply
     */
    initialServerSideFetch: (state, action) => {
      if (state.basketItems.length === 0 || action.payload.basket.length > 0) {
        state.basketItems = action.payload.basket.map((item: TBasketEntry) => {
          return { productId: item.productId, quantity: item.quantity };
        });
      } else {
        state.basketItems.map((basketItem) => {
          addNewProductToBasket(basketItem.productId, basketItem.quantity);
        });
      }
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
  initialServerSideFetch,
  hideLoading,
} = basketSlice.actions;
export default basketSlice.reducer;
