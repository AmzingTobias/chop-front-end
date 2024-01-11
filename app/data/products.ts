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

export interface IProductQuestionAnswer {
  // The id of the answer
  id: number;
  // The id of the user who answered the question
  answeredBy: number;
  // The answer provided by the user
  answer: string;
  // When the answer provided
  answeredOn: Date;
  // The overall rating of the answer
  overallRating: number;
}

export interface IProductQuestion {
  id: number;
  question: string;
  // The id of the user who asked the question
  askedBy: number;
  askedOn: Date;
  answers?: IProductQuestionAnswer[];
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
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/products/?search=${query}`,
      { next: { revalidate: 600 } }
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

export const getProductsOfSameStyle = (
  productId: number | string
): Promise<IProductEntry[]> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/products/styles/${productId}`
    )
      .then((response) => {
        if (response.ok) {
          response
            .json()
            .then((responseAsJson) => {
              resolve(responseAsJson);
            })
            .catch((err) => reject(err));
        }
      })
      .catch((err) => reject(err));
  });
};

export const getProductQuestionsWithAnswers = (
  productId: number | string
): Promise<IProductQuestion[]> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/products/questions/${productId}`
    )
      .then((response) => {
        if (response.ok) {
          response
            .json()
            .then(async (productQuestions: IProductQuestion[]) => {
              const questionsWithAnswers: IProductQuestion[] =
                await Promise.all(
                  productQuestions.map(async (question) => {
                    const res = await fetch(
                      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/products/questions/answer/${question.id}`
                    );
                    if (res.ok) {
                      const answersToQuestions = await res.json();
                      const questionsWithAnswers: IProductQuestion = {
                        ...question,
                        answers: answersToQuestions,
                      };
                      return questionsWithAnswers;
                    } else {
                      return question;
                    }
                  })
                );
              resolve(questionsWithAnswers);
            })
            .catch((err) => reject(err));
        }
      })
      .catch((err) => reject(err));
  });
};

export const getProductIdsOfFavouriteProducts = (): Promise<number[]> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/products/favourite`,
      {
        headers: {
          "Content-type": "application/json",
        },
        mode: "cors",
        credentials: "include",
      }
    )
      .then(async (response) => {
        if (response.ok) {
          response
            .json()
            .then((jsonData: { productId: number }[]) => {
              resolve(jsonData.map((product) => product.productId));
            })
            .catch((err) => {
              console.error(err);
              reject(err);
            });
        } else {
          reject(`Request failed ${await response.text()}`);
        }
      })
      .catch((err) => {
        console.error("FETCH FAILING HERE");
        console.error(err);
        reject(err);
      });
  });
};

export const getFavouriteProducts = (): Promise<IProductEntryWithImages[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const productIds = await getProductIdsOfFavouriteProducts();

      const products = await Promise.all(
        productIds.map(async (id) => {
          const product = await getProductWithId(id);

          if (!product) {
            console.error(`Product with id: ${id}, not found.`);
            return null;
          }

          const productImages = await getProductImages(product.id);

          const details: IProductEntryWithImages = {
            productId: product.id,
            productPrice: product.price,
            productDescription: product.description,
            brandId: product.brandId,
            brandName: product.brandName,
            productPageLink: `./products/${product.id}`,
            productName: product.name,
            imageWidth: 600,
            imageHeight: 600,
            image: {
              primaryLink:
                productImages.length > 0
                  ? `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/images/products/${product.id}/${productImages[0].fileName}`
                  : noProductImage.src,
              hoverLink:
                productImages.length > 1
                  ? `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/images/products/${product.id}/${productImages[1].fileName}`
                  : undefined,
              altText: "PRODUCT",
            },
          };

          return details;
        })
      );

      const productsNoNull: IProductEntryWithImages[] = products.filter(
        (product) => product !== null
      ) as IProductEntryWithImages[];

      resolve(productsNoNull);
    } catch (error) {
      reject(error);
    }
  });
};

export const removeProductFromFavourite = (
  productId: number
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/products/${productId}/favourite`,
      {
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        method: "DELETE",
      }
    )
      .then((response) => {
        if (response.ok) {
          // Favourite removed
          resolve(true);
        } else {
          // An error occured
          resolve(false);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};
