import { getProductImages } from "./images";
import { getProductWithId, mapProductsToImages } from "./products";
import noProductImage from "@/public/no-product.png";

export const addNewProductToBasket = (
  productId: number,
  quantity: number
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/basket/`, {
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        productId: productId,
        quantity: quantity,
      }),
    })
      .then(async (response) => {
        if (response.ok) {
          resolve(true);
        } else {
          reject(`Request failed ${await response.text()}`);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const updateProductInBasket = (
  productId: number,
  quantity: number
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/basket/`, {
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      method: "PUT",
      body: JSON.stringify({
        productId: productId,
        quantity: quantity,
      }),
    })
      .then(async (response) => {
        if (response.ok) {
          resolve(true);
        } else {
          reject(`Request failed ${await response.text()}`);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const removeProductFromBasket = (
  productId: number
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/basket/`, {
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      method: "DELETE",
      body: JSON.stringify({
        productId: productId,
      }),
    })
      .then(async (response) => {
        if (response.ok) {
          resolve(true);
        } else {
          reject(`Request failed ${await response.text()}`);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export type TBasketEntry = {
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  productImageURL: string;
};

export const getBasketContents = (): Promise<TBasketEntry[]> => {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/basket`, {
      mode: "cors",
      credentials: "include",
    }).then((response) => {
      if (response.ok) {
        response
          .json()
          .then(
            async (
              baseBasketContents: { productId: number; quantity: number }[]
            ) => {
              const basketContentsWithUndefined = await Promise.all(
                baseBasketContents.map(async (baseItem) => {
                  const productEntry = await getProductWithId(
                    baseItem.productId
                  );
                  const productImages = await getProductImages(
                    baseItem.productId
                  );
                  if (productEntry !== null) {
                    const basketEntry: TBasketEntry = {
                      productId: productEntry.id,
                      productName: productEntry.name,
                      price: productEntry.price,
                      quantity: baseItem.quantity,
                      productImageURL:
                        productImages.length > 0
                          ? `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/images/products/${productEntry.id}/${productImages[0].fileName}`
                          : noProductImage.src,
                    };
                    return basketEntry;
                  }
                })
              );
              const basketContents: TBasketEntry[] =
                basketContentsWithUndefined.filter(
                  (item) => item !== undefined
                ) as TBasketEntry[];
              resolve(basketContents);
            }
          );
      }
    });
  });
};
