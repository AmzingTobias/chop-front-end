export type TNavigationLinks = {
  displayName: string;
  path: string;
};

export const getProductTypes = async (): Promise<TNavigationLinks[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/product-types`
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
