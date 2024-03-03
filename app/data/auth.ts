import { JwtPayload, jwtDecode } from "jwt-decode";
import { z } from "zod";

export const authFormSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(5, "Password must have a minimum of 5 characters")
      .max(25, "Password must not be longer than 25 characters")
      .regex(/[0-9]/, { message: "Must contain a number" }),
  })
  .required();

export const enum EAccountTypes {
  customer = 0,
  sales = 1,
  support = 2,
  admin = 3,
  warehouse = 4,
}

interface authTokenPayload extends JwtPayload {
  accountType?: EAccountTypes;
  accountTypeId?: number;
  user_id?: number;
}

export const getAccountTypeFromCookie = (
  authCookie: string
): EAccountTypes | undefined => {
  const decodedToken = jwtDecode<authTokenPayload>(authCookie);
  if (decodedToken.accountType !== undefined) {
    return decodedToken.accountType;
  }
  return undefined;
};

export const getAccountIdFromCookie = (
  authCookie: string
): number | undefined => {
  const decodedToken = jwtDecode<authTokenPayload>(authCookie);
  if (decodedToken.user_id !== undefined) {
    return decodedToken.user_id;
  }
  return undefined;
};

export const getCustomerIdFromCookie = (
  authCookie: string
): number | undefined => {
  const decodedToken = jwtDecode<authTokenPayload>(authCookie);
  if (
    decodedToken.accountType !== undefined &&
    decodedToken.accountTypeId !== undefined
  ) {
    if (decodedToken.accountType === EAccountTypes.customer) {
      return decodedToken.accountTypeId;
    }
  }
  return undefined;
};

export type TAccountDetailsEntry = {
  id: number;
  email: string;
  type: number | null;
};

export const getAllAccounts = (): Promise<TAccountDetailsEntry[]> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/auth/accounts`,
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

export type TAccountDetails = {
  email: string;
};

export const getAccountDetails = (): Promise<TAccountDetails | null> => {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/auth/`, {
      credentials: "include",
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
          response
            .json()
            .then((data) => resolve(data))
            .catch((err) => reject(err));
        } else {
          resolve(null);
        }
      })
      .catch((err) => reject(err));
  });
};
