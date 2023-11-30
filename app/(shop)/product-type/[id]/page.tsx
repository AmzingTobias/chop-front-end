import {
  getProductsByProductType,
  mapProductsToImages,
} from "@/app/data/products";
import Image from "next/image";
import ProductCard from "./ProductCard";
import Searchbar from "@/app/components/searchbars/Searchbar";

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
    <main className="flex flex-col w-full">
      <Searchbar variant="accent" />
      <br className="my-4" />
      <div className="flex flex-row">
        <div className="w-1/3 min-h-full"></div>
        <div className="flex flex-col gap-8 w-2/3">
          {productsToDisplay.map((product) => (
            <div key={product.productId}>
              <ProductCard
                productId={product.productId}
                productPageLink={product.productPageLink}
                productName={product.productName}
                brandName={product.brandName}
                brandId={product.brandId}
                productDescription={
                  typeof product.productDescription === "string"
                    ? product.productDescription
                    : ""
                }
                productPrice={product.productPrice}
                image={product.image}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
