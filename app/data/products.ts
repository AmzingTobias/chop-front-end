import { TImageDetails } from "../components/product-cards/common/ProductImageWithHover";
import { getProductImages } from "./images";
import noProductImage from "../../public/no-product.png";

export interface IProductEntry {
  id: number;
  name: string;
  description?: string;
  brandId?: number;
  brandName?: string;
  available: boolean;
  stock_count: number;
  price: number;
}

export interface IProductEntryWithImages {
  productId: number;
  productName: string;
  productPrice: number;
  brandId?: number;
  brandName?: string;
  productPageLink: string;
  productDescription?: string;
  image: TImageDetails;
  imageWidth: number;
  imageHeight: number;
}

export const getProductWithId = (
  productId: number
): Promise<IProductEntry | null> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/products/${productId}`,
      { next: { revalidate: 600 } }
    )
      .then(async (response) => {
        if (response.ok) {
          const jsonData: IProductEntry[] = await response.json();
          resolve(jsonData.length > 0 ? jsonData[0] : null);
        } else {
          reject();
        }
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
};

/**
 * Get a selected number of random products
 * @param amount The number of products up to and including to get
 * @returns A list of randomly selected products, of length no more than amount.
 * Rejects on error
 */
export const getRandomProducts = async (
  amount: number
): Promise<IProductEntry[]> => {
  return new Promise((resolve, reject) => {
    // TODO add tagging to enable revalidate when new products are added
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/products/random?amount=${amount}`,
      { next: { revalidate: 600 } }
    )
      .then(async (response) => {
        if (!response.ok) {
          console.error(`${response.status}: ${await response.text()}`);
          resolve([]);
        } else {
          response
            .json()
            .then((jsonData) => {
              resolve(jsonData);
            })
            .catch((err) => {
              reject(err);
            });
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/**
 * Get a list of products based on a product type
 * @param productTypeId The id of the product type to get the products for
 * @returns A list of products for the product type.
 * Rejects on error
 */
export const getProductsByProductType = async (
  productTypeId: number | string
): Promise<IProductEntry[]> => {
  return new Promise((resolve, reject) => {
    // TODO add tagging to enable revalidate when new products are added
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/product-types/${productTypeId}/products`,
      { next: { revalidate: 600 } }
    )
      .then(async (response) => {
        if (!response.ok) {
          console.error(`${response.status}: ${await response.text()}`);
          resolve([]);
        } else {
          response
            .json()
            .then((jsonData) => {
              resolve(jsonData);
            })
            .catch((err) => {
              reject(err);
            });
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/**
 * Take a list of products found and map them, plus their images into the data structure used
 * for mini product cards
 * @param productsFound The list of products to convert to the data structure IMiniProductCardProps
 * @param imageWidth The width of the images
 * @param imageHeight The height of the images
 * @returns A list of IMiniProductCardProps
 */
export const mapProductsToImages = async (
  productsFound: IProductEntry[],
  imageWidth: number,
  imageHeight: number
): Promise<IProductEntryWithImages[]> => {
  return await Promise.all(
    productsFound.map(async (product) => {
      const images = await getProductImages(product.id);
      return {
        productId: product.id,
        productName: product.name,
        productDescription: product.description,
        productPrice: product.price,
        brandId: product.brandId,
        brandName: product.brandName,
        productPageLink: `/product/${product.id}`,
        image: {
          primaryLink:
            images.length > 0
              ? `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/images/products/${product.id}/${images[0].fileName}`
              : // TODO make this a no image found image
                noProductImage.src,
          hoverLink:
            images.length > 1
              ? `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/images/products/${product.id}/${images[1].fileName}`
              : undefined,
          altText: "PRODUCT",
        },
        imageWidth: imageWidth,
        imageHeight: imageHeight,
      };
    })
  );
};

export const searchForProducts = (query: string): Promise<IProductEntry[]> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/products/?search=${query}`
    )
      .then((response) => {
        if (response.ok) {
          response
            .json()
            .then((responseAsJson: IProductEntry[]) => {
              resolve(responseAsJson);
            })
            .catch((err) => reject(err));
        }
      })
      .catch((err) => reject(err));
  });
};
