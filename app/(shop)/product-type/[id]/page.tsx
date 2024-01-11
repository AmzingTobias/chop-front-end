import {
  getProductsByProductType,
  mapProductsToImages,
} from "@/app/data/products";

import ProductResults from "./ProductResults";
import Searchbar from "@/app/components/searchbars/Searchbar";
import { cookies } from "next/headers";

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

  const accountLoggedIn = cookies().has("auth");

  return (
    <main className="flex flex-col w-full overflow-x-clip p-1">
      <Searchbar
        variant="accent"
        showResultsOnInputChange={true}
        searchResultLimit={10}
      />
      <br className="my-2" />
      <div className="md:hidden w-full">
        <ProductResults
          userLoggedIn={accountLoggedIn}
          products={productsToDisplay}
          productImageHeight={120}
          productImageWidth={120}
        />
      </div>
      <div className="hidden md:flex w-full">
        <ProductResults
          userLoggedIn={accountLoggedIn}
          products={productsToDisplay}
          productImageHeight={250}
          productImageWidth={188}
        />
      </div>
    </main>
  );
}
