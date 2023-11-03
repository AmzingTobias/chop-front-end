export type TNavigationLinks = {
  displayName: string;
  path: string;
};

export const getProductTypes = async (): Promise<TNavigationLinks[]> => {
  const res = await fetch(
    `${process.env.SERVER_API_HOST_ADDRESS}/v1/product-types`
  );
  if (!res.ok) {
    return [];
  }
  const jsonData = await res.json();
  return jsonData.map((productType: { id: number; type: string }) => ({
    displayName: productType.type,
    path: `/product-type/${productType.id}`,
  }));
};

export const infobarBtns: TNavigationLinks[] = [
  {
    displayName: "Help & FAQ",
    path: "/",
  },
  {
    displayName: "Track my order",
    path: "/",
  },
  {
    displayName: "Contact us",
    path: "/",
  },
];
