import {
  getProductsByProductType,
  mapProductsToImages,
} from "@/app/data/products";

import ProductResults from "./ProductResults";

export async function generateStaticParams() {
  const productTypes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/product-types/`
  ).then((res) => res.json());

  return productTypes.map((type: { id: number; type: string }) => ({
    id: type.id.toString(),
  }));
}

export default async function Page({ params }: { params: { id: number } }) {
  const productsForType = await getProductsByProductType(params.id);
  // Mapped to the structure that allows them to be displayed in a grid
  const productsToDisplay = await mapProductsToImages(
    productsForType,
    188,
    250
  );

  return (
    <main className="flex flex-col w-full overflow-x-clip">
      <div className="md:hidden w-full">
        <ProductResults
          products={productsToDisplay}
          productImageHeight={120}
          productImageWidth={120}
        />
      </div>
      <div className="hidden md:flex w-full">
        <ProductResults products={productsToDisplay} />
      </div>
    </main>
  );
}
