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
