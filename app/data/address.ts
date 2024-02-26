export type TCustomerAddress = {
  // The id of the addres
  id: number;
  // The area code for the address
  areaCode: string;
  // The first line of the address
  firstAddressLine: string;
  // The state the address is in for the country
  countryState: string;
  // The id of the country the address is in
  countryId: number;
  // The name of the country
  countryName?: string;
  // The second line of the address, if it exists
  secondAddressLine?: string;
};

export type TShippingCountries = {
  id: number;
  name: string;
};

export const getCountriesAvailableForShipping = (): Promise<
  TShippingCountries[]
> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/auth/address/available-countries`,
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          response
            .json()
            .then((jsonData) => {
              resolve(jsonData);
            })
            .catch((err) => {
              reject(err);
            });
        } else {
          reject();
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getCustomerAddresses = (): Promise<TCustomerAddress[]> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/auth/address/`,
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
            .then((jsonData) => {
              resolve(jsonData);
            })
            .catch((err) => {
              reject(err);
            });
        } else {
          reject();
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getDefaultAddress = (): Promise<number | null> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/auth/address/default`,
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
            .then((jsonData) => {
              if (jsonData === null) {
                resolve(null);
              } else {
                resolve(jsonData.id);
              }
            })
            .catch((err) => reject(err));
        } else {
          reject();
        }
      })
      .catch((err) => reject(err));
  });
};

export const serverUpdateDefaultAddress = (
  addressId: number
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/auth/address/default`,
      {
        headers: {
          "Content-type": "application/json",
        },
        mode: "cors",
        credentials: "include",
        method: "PUT",
        body: JSON.stringify({
          addressId: addressId,
        }),
      }
    )
      .then((response) => {
        resolve(response.ok);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
};

export const serverSetDefaultAddress = (
  addressId: number
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/auth/address/default`,
      {
        headers: {
          "Content-type": "application/json",
        },
        mode: "cors",
        credentials: "include",
        method: "POST",
        body: JSON.stringify({
          addressId: addressId,
        }),
      }
    )
      .then((response) => {
        resolve(response.ok);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
};

export const serverDeleteAddress = (addressId: number): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/auth/address/`,
      {
        headers: {
          "Content-type": "application/json",
        },
        mode: "cors",
        credentials: "include",
        method: "DELETE",
        body: JSON.stringify({
          addressId: addressId,
        }),
      }
    )
      .then((response) => {
        resolve(response.ok);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
};

export const createNewAddress = (
  address: TCustomerAddress
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/auth/address/`,
      {
        headers: {
          "Content-type": "application/json",
        },
        mode: "cors",
        credentials: "include",
        method: "POST",
        body: JSON.stringify({
          "first-address-line": address.firstAddressLine,
          "second-address-line": address.secondAddressLine,
          "area-code": address.areaCode,
          state: address.countryState,
          "country-id": address.countryId,
        }),
      }
    )
      .then((response) => {
        resolve(response.ok);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
};

export const getAddressWithId = (
  addressId: number
): Promise<TCustomerAddress | null> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/auth/address/${addressId}`,
      {
        mode: "cors",
        credentials: "include",
      }
    )
      .then((response) =>
        response
          .json()
          .then((data) => resolve(data["address"]))
          .catch((err) => {
            reject(err);
          })
      )
      .catch((err) => {
        reject(err);
      });
  });
};
