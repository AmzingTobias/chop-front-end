import {
  getProductsByProductType,
  mapProductsToImages,
} from "@/app/data/products";

import ProductResults from "./ProductResults";
import { cookies } from "next/headers";
import { getAccountTypeFromCookie } from "@/app/data/auth";
import SectionHeading from "@/app/components/SectionHeading";

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

  const productTypeName: { id: number; type: string } = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/product-types/${params.id}`
  ).then((res) => res.json());

  const authCookie = cookies().get("auth");
  const accountTypeLoggedIn = authCookie
    ? getAccountTypeFromCookie(authCookie.value)
    : undefined;

  return (
    <main className="flex flex-col gap-4 w-full overflow-x-clip p-1">
      <SectionHeading text={productTypeName.type} />
      <div className="flex flex-col gap-1">
        <div className="md:hidden w-full">
          <ProductResults
            accountTypeLoggedIn={accountTypeLoggedIn}
            products={productsToDisplay}
            productImageHeight={120}
            productImageWidth={120}
          />
        </div>
        <div className="hidden md:flex w-full">
          <ProductResults
            accountTypeLoggedIn={accountTypeLoggedIn}
            products={productsToDisplay}
            productImageHeight={250}
            productImageWidth={188}
          />
        </div>
      </div>
    </main>
  );
}
