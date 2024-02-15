import { TImageDetails } from "../components/product-cards/common/ProductImageWithHover";
import { getProductImages } from "./images";
import noProductImage from "../../public/no-product.png";
import { Description } from "@radix-ui/react-alert-dialog";

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
  productAvailable: boolean;
  productStockCount: number;
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
 * Get a list of products based on a brand
 * @param brandId The id of the brand to get the products for
 * @returns A list of products for the brand.
 * Rejects on error
 */
export const getProductsByBrand = async (
  brandId: number | string
): Promise<IProductEntry[]> => {
  return new Promise((resolve, reject) => {
    // TODO add tagging to enable revalidate when new products are added
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/brands/${brandId}/products`,
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
        productStockCount: product.stock_count,
        productAvailable: product.available,
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
            productAvailable: product.available,
            productStockCount: product.stock_count,
            brandId: product.brandId,
            brandName: product.brandName,
            productPageLink: `./product/${product.id}`,
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

export type TProductReview = {
  id: number;
  customerId: number;
  createdOn: Date;
  updatedOn: Date | null;
  rating: number;
  review: string;
};

export const getReviewsForProduct = (
  productId: number
): Promise<TProductReview[]> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/products/reviews?product=${productId}`,
      {
        method: "GET",
      }
    )
      .then(async (response) => {
        if (response.ok) {
          response
            .json()
            .then((jsonData: TProductReview[]) => {
              resolve(
                jsonData.sort((a, b) => {
                  const dateA = a.updatedOn || a.createdOn;
                  const dateB = b.updatedOn || b.createdOn;

                  if (dateA !== null && dateB !== null) {
                    return (new Date(dateB) as any) - (new Date(dateA) as any);
                  } else if (dateA !== null) {
                    return (new Date(dateB) as any) - (new Date(dateA) as any);
                  } else if (dateB !== null) {
                    return (new Date(dateB) as any) - (new Date(dateA) as any);
                  } else {
                    return 0; // Dates are both null, consider them equal
                  }
                })
              );
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

export const getLastPurchaseDateForProduct = (
  productId: number
): Promise<Date | undefined> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/orders/last-purchase/${productId}`,
      {
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        method: "GET",
      }
    )
      .then(async (response) => {
        if (response.ok) {
          response
            .json()
            .then((jsonData) => {
              if (typeof jsonData.date === "string") {
                resolve(new Date(jsonData.date as unknown as string));
              } else {
                resolve(undefined);
              }
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

export const updateProductReview = (
  reviewId: number,
  newReview: string,
  newRating: number
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/products/reviews/${reviewId}`,
      {
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        method: "PUT",
        body: JSON.stringify({
          rating: newRating,
          review: newReview,
        }),
      }
    )
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

export const deleteProductReview = (reviewId: number): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/products/reviews/${reviewId}`,
      {
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        method: "DELETE",
      }
    )
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

export const postProductReview = (
  productId: number,
  rating: number,
  review: string
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/products/reviews/`,
      {
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        method: "POST",
        body: JSON.stringify({
          productId: productId,
          rating: rating,
          review: review,
        }),
      }
    )
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

type TCustomerViewHistory = {
  productId: number;
  date: Date;
};

export const getProductViewHistoryForCustomer = (): Promise<
  IProductEntryWithImages[]
> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/products/history/`,
      {
        credentials: "include",
      }
    )
      .then((response) => {
        if (response.ok) {
          response.json().then(async (jsonData: TCustomerViewHistory[]) => {
            const products = await Promise.all(
              jsonData.map(async (productViewed) => {
                const product = await getProductWithId(productViewed.productId);

                if (!product) {
                  console.error(
                    `Product with id: ${productViewed.productId}, not found.`
                  );
                  return null;
                }

                const productImages = await getProductImages(product.id);

                const details: IProductEntryWithImages = {
                  productId: product.id,
                  productPrice: product.price,
                  productDescription: product.description,
                  productAvailable: product.available,
                  productStockCount: product.stock_count,
                  brandId: product.brandId,
                  brandName: product.brandName,
                  productPageLink: `./product/${product.id}`,
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
          });
        } else {
          reject(`Internal error: ${response.status}`);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const removeProductFromViewHistory = (
  productId: number
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/products/history/${productId}`,
      {
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        method: "DELETE",
      }
    )
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

export type TBaseProduct = {
  id: number;
  brandName: string;
  description: string;
  productCount: number;
};

export const getAllBaseProducts = (): Promise<TBaseProduct[]> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/products/base`,
      {
        headers: {
          "Content-type": "application/json",
        },
        mode: "cors",
        credentials: "include",
      }
    )
      .then((response) => {
        if (response.ok) {
          response
            .json()
            .then((data) => resolve(data))
            .catch((err) => reject(err));
        } else {
          reject("Server error");
        }
      })
      .catch((err) => reject(err));
  });
};

export const getProductIdsWithBaseId = (
  baseProductId: number
): Promise<{ id: number }[]> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/products/base/${baseProductId}`,
      {
        headers: {
          "Content-type": "application/json",
        },
        mode: "cors",
        credentials: "include",
      }
    )
      .then((response) => {
        if (response.ok) {
          response
            .json()
            .then((data) => resolve(data))
            .catch((err) => reject(err));
        } else {
          reject("Server error");
        }
      })
      .catch((err) => reject(err));
  });
};

export type TProductType = {
  id: number;
  type: string;
  productCount: number;
};

export const getProductTypes = (): Promise<TProductType[]> => {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/product-types`)
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

export const updateBaseProduct = (
  baseProductId: number,
  description: string
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/products/base/${baseProductId}`,
      {
        headers: {
          "Content-type": "application/json",
        },
        mode: "cors",
        credentials: "include",
        method: "put",
        body: JSON.stringify({
          description,
        }),
      }
    )
      .then((response) => {
        resolve(response.ok);
      })
      .catch((err) => reject(err));
  });
};

export const getAssignedProductTypes = (
  baseProductId: number
): Promise<TProductType[]> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/products/base/${baseProductId}/product-types`,
      {
        headers: {
          "Content-type": "application/json",
        },
        mode: "cors",
        credentials: "include",
      }
    )
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

export const addProductTypeToBaseProduct = (
  baseProductId: number,
  productTypeId: number
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/products/base/${baseProductId}/product-types`,
      {
        headers: {
          "Content-type": "application/json",
        },
        mode: "cors",
        credentials: "include",
        method: "post",
        body: JSON.stringify({
          "product-type-ids": [productTypeId],
        }),
      }
    )
      .then((response) => {
        resolve(response.ok);
      })
      .catch((err) => reject(err));
  });
};

export const removeProductTypeFromBaseProduct = (
  baseProductId: number,
  productTypeId: number
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/products/base/${baseProductId}/product-types`,
      {
        headers: {
          "Content-type": "application/json",
        },
        mode: "cors",
        credentials: "include",
        method: "delete",
        body: JSON.stringify({
          "product-type-ids": [productTypeId],
        }),
      }
    )
      .then((response) => {
        resolve(response.ok);
      })
      .catch((err) => reject(err));
  });
};

export const createProductRequest = (
  baseProductId: number,
  productName: string,
  productDescription: string,
  price: number,
  stockCount: number,
  available: boolean
): Promise<{ created: boolean; productId?: number }> => {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/products`, {
      headers: {
        "Content-type": "application/json",
      },
      mode: "cors",
      credentials: "include",
      method: "post",
      body: JSON.stringify({
        name: productName,
        price: price,
        "base-id": baseProductId,
        description: productDescription,
        available: available,
        stockCount: stockCount,
      }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            resolve({ created: true, productId: data.productId });
          });
        } else {
          reject("Failed to create product");
        }
      })
      .catch((err) => reject(err));
  });
};

export const addImageToProduct = (
  productId: number,
  imageFile: File
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("image", imageFile);
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/images/product/${productId}`,
      {
        mode: "cors",
        credentials: "include",
        body: formData,
        method: "POST",
      }
    )
      .then((response) => {
        if (response.ok) {
          resolve(true);
        } else {
          reject("Couldn't add image to product");
        }
      })
      .catch((err) => reject(err));
  });
};

export const deleteProduct = (): Promise<true> => {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/products`, {
      mode: "cors",
      credentials: "include",
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          resolve(true);
        } else {
          reject("Failed to delete product");
        }
      })
      .catch((err) => reject(err));
  });
};

export const updateProductName = (
  productId: number,
  name: string
): Promise<true> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/products/${productId}/name`,
      {
        headers: {
          "Content-type": "application/json",
        },
        mode: "cors",
        credentials: "include",
        method: "put",
        body: JSON.stringify({
          name: name,
        }),
      }
    )
      .then((response) => {
        if (response.ok) {
          resolve(true);
        } else {
          reject("Failed to update product's name");
        }
      })
      .catch((err) => reject(err));
  });
};

export const updateProductDescription = (
  productId: number,
  description: string
): Promise<true> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/products/${productId}/description`,
      {
        headers: {
          "Content-type": "application/json",
        },
        mode: "cors",
        credentials: "include",
        method: "put",
        body: JSON.stringify({
          description: description,
        }),
      }
    )
      .then((response) => {
        if (response.ok) {
          resolve(true);
        } else {
          reject("Failed to update product's description");
        }
      })
      .catch((err) => reject(err));
  });
};

export const updateProductPrice = (
  productId: number,
  price: number
): Promise<true> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/products/${productId}/price`,
      {
        headers: {
          "Content-type": "application/json",
        },
        mode: "cors",
        credentials: "include",
        method: "put",
        body: JSON.stringify({
          price: price,
        }),
      }
    )
      .then((response) => {
        if (response.ok) {
          resolve(true);
        } else {
          reject("Failed to update product's price");
        }
      })
      .catch((err) => reject(err));
  });
};

export const updateProductStock = (
  productId: number,
  stockCount: number
): Promise<true> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/products/${productId}/stock`,
      {
        headers: {
          "Content-type": "application/json",
        },
        mode: "cors",
        credentials: "include",
        method: "put",
        body: JSON.stringify({
          stock: stockCount,
        }),
      }
    )
      .then((response) => {
        if (response.ok) {
          resolve(true);
        } else {
          reject("Failed to update product's stock");
        }
      })
      .catch((err) => reject(err));
  });
};

export const updateProductAvailability = (
  productId: number,
  available: boolean
): Promise<true> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/products/${productId}/available`,
      {
        headers: {
          "Content-type": "application/json",
        },
        mode: "cors",
        credentials: "include",
        method: "put",
        body: JSON.stringify({
          available: available,
        }),
      }
    )
      .then((response) => {
        if (response.ok) {
          resolve(true);
        } else {
          reject("Failed to update product's availability");
        }
      })
      .catch((err) => reject(err));
  });
};

export const createNewProductType = (typeName: string): Promise<true> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/product-types`,
      {
        headers: {
          "Content-type": "application/json",
        },
        mode: "cors",
        credentials: "include",
        method: "POST",
        body: JSON.stringify({
          "product-type-name": typeName,
        }),
      }
    )
      .then((response) => {
        if (response.ok) {
          resolve(true);
        } else {
          reject("Failed to create product type");
        }
      })
      .catch((err) => reject(err));
  });
};
