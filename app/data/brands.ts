import { TBaseProduct } from "./products";

export type TBrandEntry = {
  id: number;
  name: string;
  productCount: number;
};

export const getAllBrands = (): Promise<TBrandEntry[]> => {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/brands`)
      .then((response) => {
        if (response.ok) {
          response
            .json()
            .then((data) => resolve(data))
            .catch((err) => reject(err));
        } else {
          reject("Response failed");
        }
      })
      .catch((err) => reject(err));
  });
};

export const updateBrandIdForBaseProduct = (
  baseProductId: number,
  brandId: number | undefined
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/products/base/${baseProductId}/brand`,
      {
        headers: {
          "Content-type": "application/json",
        },
        mode: "cors",
        credentials: "include",
        method: brandId === undefined ? "delete" : "put",
        body: JSON.stringify({ brandId }),
      }
    )
      .then((response) => {
        if (response.ok) {
          resolve(true);
        } else {
          reject("Response failed");
        }
      })
      .catch((err) => reject(err));
  });
};

export const createNewBrand = (brandName: string): Promise<true> => {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/brands`, {
      headers: {
        "Content-type": "application/json",
      },
      mode: "cors",
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ name: brandName }),
    })
      .then((response) => {
        if (response.ok) {
          resolve(true);
        } else {
          reject("Error creating brand");
        }
      })
      .catch((err) => reject(err));
  });
};

export const getBaseProductsWithBrand = (
  brandId: number
): Promise<TBaseProduct[]> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/brands/${brandId}/base-products`,
      {
        headers: {
          "Content-type": "application/json",
        },
        mode: "cors",
        credentials: "include",
        method: "GET",
      }
    )
      .then((response) => {
        if (response.ok) {
          response
            .json()
            .then((data) => resolve(data))
            .catch((err) => reject(err));
        } else {
          reject("Failed to get base products");
        }
      })
      .catch((err) => reject(err));
  });
};

export const updateBrandName = (
  brandId: number,
  brandName: string
): Promise<true> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/brands/${brandId}`,
      {
        headers: {
          "Content-type": "application/json",
        },
        mode: "cors",
        credentials: "include",
        method: "PUT",
        body: JSON.stringify({ name: brandName }),
      }
    )
      .then((response) => {
        if (response.ok) {
          resolve(true);
        } else {
          reject("Error creating brand");
        }
      })
      .catch((err) => reject(err));
  });
};
