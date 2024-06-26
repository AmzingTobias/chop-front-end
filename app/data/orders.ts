import { TImageDetails } from "../components/product-cards/common/ProductImageWithHover";
import { getProductImages } from "./images";

export type TOrderEntry = {
  // The id of the order
  id: number;
  // The current status for the order
  status: string;
  // The number of products featured in the order
  product_count: number;
  // The total cost of the order
  total: number;
  // The amount that was paid for the order (includes discounts)
  pricePaid: number;
  // The date the order was placed
  placed_on: Date;
  // The id of the address this order was sent to
  shippingAddressId: number;
};

export const getCustomersOrders = (
  customerId?: number
): Promise<TOrderEntry[]> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/orders${
        customerId === undefined ? "" : `?customerId=${customerId}`
      }`,
      {
        mode: "cors",
        credentials: "include",
      }
    )
      .then((response) => {
        if (response.ok)
          response
            .json()
            .then((json) => resolve(json))
            .catch((err) => reject(err));
        else {
          response
            .text()
            .then((responseText) => reject(responseText))
            .catch((err) => reject(err));
        }
      })
      .catch((err) => reject(err));
  });
};

export const getDiscountsUsedForOrder = (
  orderId: number
): Promise<{ code: string }[]> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/orders/${orderId}/discounts`,
      {
        mode: "cors",
        credentials: "include",
      }
    )
      .then((response) => {
        if (response.ok)
          response
            .json()
            .then((json) => resolve(json))
            .catch((err) => reject(err));
        else {
          response
            .text()
            .then((responseText) => reject(responseText))
            .catch((err) => reject(err));
        }
      })
      .catch((err) => reject(err));
  });
};

interface IBaseProductInOrder {
  // Id of the product
  productId: number;
  // The name of the product
  productName: string;
  // The amount of the product that was purchased
  quantity: number;
  // The price paid for the product
  price: number;
}
const getProductInOrder = (orderId: number): Promise<IBaseProductInOrder[]> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/orders/${orderId}/products`,
      {
        mode: "cors",
        credentials: "include",
      }
    )
      .then((response) => {
        if (response.ok)
          response
            .json()
            .then((json) => resolve(json))
            .catch((err) => reject(err));
        else {
          response
            .text()
            .then((responseText) => reject(responseText))
            .catch((err) => reject(err));
        }
      })
      .catch((err) => reject(err));
  });
};

export interface IDetailedProductInOrder extends IBaseProductInOrder {
  imageDetails?: TImageDetails;
}

export const getProductsDetailsInOrder = (
  orderId: number
): Promise<IDetailedProductInOrder[]> => {
  return new Promise((resolve, reject) => {
    getProductInOrder(orderId)
      .then(async (baseInfo) => {
        const detailedProductInfo = await Promise.all(
          baseInfo.map(async (baseProduct) => {
            const productImages = await getProductImages(baseProduct.productId);
            const productInfo: IDetailedProductInOrder = {
              imageDetails:
                productImages.length > 0
                  ? {
                      altText: "Preview",
                      primaryLink: `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/images/products/${baseProduct.productId}/${productImages[0].fileName}`,
                    }
                  : undefined,
              ...baseProduct,
            };
            return productInfo;
          })
        );
        resolve(detailedProductInfo);
      })
      .catch((err) => reject(err));
  });
};

export const getAllOrders = (): Promise<TOrderEntry[]> => {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/orders/`, {
      mode: "cors",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok)
          response
            .json()
            .then((json) => resolve(json))
            .catch((err) => reject(err));
        else {
          response
            .text()
            .then((responseText) => reject(responseText))
            .catch((err) => reject(err));
        }
      })
      .catch((err) => reject(err));
  });
};

export type TOrderStatus = {
  id: number;
  status: string;
};

export const getAllPossibleOrderStatuses = (): Promise<TOrderStatus[]> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/orders/status`,
      {
        mode: "cors",
        credentials: "include",
      }
    )
      .then((response) => {
        if (response.ok)
          response
            .json()
            .then((json) => resolve(json))
            .catch((err) => reject(err));
        else {
          response
            .text()
            .then((responseText) => reject(responseText))
            .catch((err) => reject(err));
        }
      })
      .catch((err) => reject(err));
  });
};

export const getOrderWithId = (
  orderId: number
): Promise<TOrderEntry | null> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/orders/${orderId}`,
      {
        mode: "cors",
        credentials: "include",
      }
    )
      .then((response) => {
        if (response.ok)
          response
            .json()
            .then((json) => resolve(json["order"]))
            .catch((err) => reject(err));
        else {
          response
            .text()
            .then((responseText) => reject(responseText))
            .catch((err) => reject(err));
        }
      })
      .catch((err) => reject(err));
  });
};

export const updateOrderStatus = (
  orderId: number,
  orderStatusId: number
): Promise<true> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/orders/${orderId}/status`,
      {
        headers: {
          "Content-type": "application/json",
        },
        mode: "cors",
        credentials: "include",
        method: "POST",
        body: JSON.stringify({ orderStatusId: orderStatusId }),
      }
    )
      .then(async (response) => {
        if (response.ok) {
          resolve(true);
        } else {
          reject(await response.text());
        }
      })
      .catch((err) => reject(err));
  });
};
