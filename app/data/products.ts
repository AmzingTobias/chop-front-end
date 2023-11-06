import { IMiniProductCardProps } from "../components/product-cards/MiniProductCard";
import { getProductImages } from "./images";

interface IBaseProductEntry {
  id: number;
  name: string;
  available: boolean;
  stock_count: number;
  price: number;
}

/**
 * Get a selected number of random products
 * @param amount The number of products up to and including to get
 * @returns A list of randomly selected products, of length no more than amount.
 * Rejects on error
 */
export const getRandomProducts = async (
  amount: number
): Promise<IBaseProductEntry[]> => {
  return new Promise((resolve, reject) => {
    // TODO add tagging to enable revalidate when new products are added
    fetch(
      `${process.env.SERVER_API_HOST_ADDRESS}/v1/products/random?amount=${amount}`,
      { next: { revalidate: 600 } }
    )
      .then((response) => {
        if (!response.ok) {
          console.error(`${response.status}: ${response.text}`);
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
  productsFound: IBaseProductEntry[],
  imageWidth: number,
  imageHeight: number
): Promise<IMiniProductCardProps[]> => {
  return await Promise.all(
    productsFound.map(async (product) => {
      const images = await getProductImages(product.id);
      return {
        productName: product.name,
        productPrice: product.price,
        productPageLink: `/product/${product.id}`,
        image: {
          primaryLink:
            images.length > 0
              ? `${process.env.SERVER_API_HOST_ADDRESS}/images/products/${product.id}/${images[0].fileName}`
              : // TODO make this a no image found image
                "",
          hoverLink:
            images.length > 1
              ? `${process.env.SERVER_API_HOST_ADDRESS}/images/products/${product.id}/${images[1].fileName}`
              : undefined,
          width: imageWidth,
          height: imageHeight,
          altText: "PRODUCT",
        },
      };
    })
  );
};
