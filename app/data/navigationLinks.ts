import { getProductTypes } from "./products";

export type TNavigationLinks = {
  displayName: string;
  path: string;
};

export const getProductTypesNavLinks = async (): Promise<
  TNavigationLinks[]
> => {
  const data = await getProductTypes();
  data.sort((a, b) => b.productCount - a.productCount);
  return data.map((productType) => ({
    displayName: productType.type,
    path: `/product-type/${productType.id}`,
  }));
};
