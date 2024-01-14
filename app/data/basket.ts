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

export const getBasketContents = (): Promise<
  { productId: number; quantity: number }[]
> => {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/basket`, {
      mode: "cors",
      credentials: "include",
    })
      .then(async (response) => {
        if (response.ok) {
          response
            .json()
            .then((jsonData) => {
              resolve(jsonData);
            })
            .catch((err) => {
              reject(err);
            });
        } else {
          reject(`Request failed ${await response.text()}`);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};
