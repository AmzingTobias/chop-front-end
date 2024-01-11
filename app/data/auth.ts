import { JwtPayload, jwtDecode } from "jwt-decode";

export const enum EAccountTypes {
  customer = 0,
  sales = 1,
  support = 2,
  admin = 3,
  warehouse = 4,
}

interface authTokenPayload extends JwtPayload {
  accountType?: EAccountTypes;
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
