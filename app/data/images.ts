export interface IImageEntry {
  id: number;
  fileName: string;
}

/**
 * Get all the images that are associated with a product
 * @param productId The id of the product to get the images for
 * @returns A list of images. Rejects on error
 */
export const getProductImages = (productId: number): Promise<IImageEntry[]> => {
  return new Promise((resolve, reject) => {
    // TODO add tagging to enable revalidate when new images are added
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/images/product/${productId}`
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

export const removeImageFromProduct = (imageId: number): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/images/product/`,
      {
        headers: {
          "Content-type": "application/json",
        },
        mode: "cors",
        credentials: "include",
        method: "DELETE",
        body: JSON.stringify({
          "image-id": imageId,
        }),
      }
    )
      .then((response) => {
        if (response.ok) {
          resolve(true);
        } else {
          reject("Couldn't delete image");
        }
      })
      .catch((err) => reject(err));
  });
};

export const setImageSortOrderForProduct = (
  productId: number,
  imageIds: number[]
): Promise<true> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/images/product/${productId}`,
      {
        headers: {
          "Content-type": "application/json",
        },
        mode: "cors",
        credentials: "include",
        method: "PUT",
        body: JSON.stringify({
          "image-ids": imageIds,
        }),
      }
    )
      .then((response) => {
        if (response.ok) {
          resolve(true);
        } else {
          reject("Couldn't sort images");
        }
      })
      .catch((err) => reject(err));
  });
};
