/**
 * Type used when validating a discount code
 */
export type TDiscountCodeValidation = {
  // The id of the discount code
  id: number;
  // The code that was validated
  code: string;
  // If the discount code is currently valid
  valid: boolean;
  // The amount the discount code applies to the total order
  percent: number;
  // If the discount can be used in conjunction with other offers
  stackable: boolean;
};

export type TDiscountCodeEntry = {
  // The id of the discount code
  id: number;
  // The code that was validated
  code: string;
  // The date the code was created
  createdOn: Date;
  // The number of uses left on the code
  remainingUses: number;
  // If the discount code is currently valid
  active: boolean;
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

export const getAllDiscountCodes = (): Promise<TDiscountCodeEntry[]> => {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/discounts/`, {
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          response
            .json()
            .then((data) => resolve(data))
            .catch((err) => reject(err));
        } else {
          reject("Error getting all discounts");
        }
      })
      .catch((err) => reject(err));
  });
};

export const updateDiscountCode = (
  codeId: number,
  options: {
    percentOff?: number;
    stackable?: boolean;
    active?: boolean;
    remainingUses?: number;
  }
): Promise<true> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/discounts/code/${codeId}`,
      {
        headers: {
          "Content-type": "application/json",
        },
        mode: "cors",
        credentials: "include",
        method: "PUT",
        body: JSON.stringify({
          active: options.active,
          stackable: options.stackable,
          percent: options.percentOff,
          remainingUses: options.remainingUses,
        }),
      }
    )
      .then((response) => {
        if (response.ok) {
          resolve(true);
        } else {
          reject("Error updating discount code");
        }
      })
      .catch((err) => reject(err));
  });
};
