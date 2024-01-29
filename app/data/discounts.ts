/**
 * Type used when validating a discount code
 */
export type TDiscountCodeValidation = {
  // The code that was validated
  code: string;
  // If the discount code is currently valid
  valid: boolean;
  // The amount the discount code applies to the total order
  percent: number;
  // If the discount can be used in conjunction with other offers
  stackable: boolean;
};

/**
 * Validate a discount code
 * @param discountCode The code to validate
 * @returns A TDiscountCodeValidation if the code is valid
 */
export const validateDiscountCode = (
  discountCode: string
): Promise<TDiscountCodeValidation> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/discounts/code?query=${discountCode}`,
      {
        credentials: "include",
      }
    )
      .then((response) => {
        if (response.ok) {
          response
            .json()
            .then((jsonData) => resolve(jsonData))
            .catch((err) => reject(err));
        } else {
          reject("Code does not exist");
        }
      })
      .catch((err) => reject(err));
  });
};
