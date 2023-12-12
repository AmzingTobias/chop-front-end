"use client";

const LOCAL_STORAGE_NAME = "basket";

export const addProductToLocalBasket = (productId: number) => {
  const basket = localStorage.getItem(LOCAL_STORAGE_NAME);
  const basketAsJson = JSON.parse(basket === null ? "{}" : basket);
  if (typeof basketAsJson[productId] === "number") {
    basketAsJson[productId] += 1;
  } else {
    basketAsJson[productId] = 1;
  }
  localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(basketAsJson));
};

export const removeOneFromBasket = (productId: number) => {
  const basket = localStorage.getItem(LOCAL_STORAGE_NAME);
  const basketAsJson = JSON.parse(basket === null ? "{}" : basket);
  if (typeof basketAsJson[productId] === "number") {
    basketAsJson[productId] === 0 ? 0 : basketAsJson[productId] - 1;
  }
  localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(basketAsJson));
};

export const removeAllFromBasket = (productId: number) => {
  const basket = localStorage.getItem(LOCAL_STORAGE_NAME);
  const basketAsJson = JSON.parse(basket === null ? "{}" : basket);
  if (typeof basketAsJson[productId] === "number") {
    delete basketAsJson[productId];
  }
  localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(basketAsJson));
};

export const readLocalBasket = () => {
  const basket = localStorage.getItem(LOCAL_STORAGE_NAME);
  const basketAsJson = JSON.parse(basket === null ? "{}" : basket);
  const basketMap = new Map<string, number>(Object.entries(basketAsJson));
  console.log(basketMap);
};
