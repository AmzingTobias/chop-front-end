interface IImageEntry {
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
      `${process.env.SERVER_API_HOST_ADDRESS}/v1/images/product/${productId}`
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
