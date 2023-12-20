import { getProductImages } from "@/app/data/images";
import {
  getProductWithId,
  getProductsOfSameStyle,
  getRandomProducts,
  mapProductsToImages,
} from "@/app/data/products";
import ProductImageDisplay from "./ProductImageDisplay";
import MainProductSection from "./MainProductSection";
import PurchaseSection from "./PurchaseSection";
import ProductCarousel from "@/app/components/product-cards/ProductCarousel";
import SectionHeading from "@/app/components/SectionHeading";

export async function generateStaticParams() {
  const productIds = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/products/all`
  ).then((res) => res.json());

  return productIds.map((product: { id: number }) => ({
    id: product.id.toString(),
  }));
}

const ProductPage = async ({ params }: { params: { id: number } }) => {
  const productDetails = await getProductWithId(params.id);
  if (productDetails === null) {
    return null;
  }
  const productImages = (await getProductImages(params.id)).map((image) => {
    return `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/images/products/${params.id}/${image.fileName}`;
  });
  const sameStyleProducts = await getProductsOfSameStyle(params.id);
  const sameStyleProductsWithImages = await mapProductsToImages(
    sameStyleProducts,
    75,
    100
  );

  // TODO - Make tailored to what customers actually looked at, rather than random
  const customersAlsoLookedAt = await mapProductsToImages(
    await getRandomProducts(25),
    640,
    853
  );

  return (
    <main className="flex flex-col w-full overflow-x-clip p-1 space-y-8">
      <div className="flex flex-row w-full space-x-6">
        <ProductImageDisplay images={productImages} />
        <MainProductSection
          productId={productDetails.id}
          productName={productDetails.name}
          productDescription={
            productDetails.description === undefined
              ? ""
              : productDetails.description
          }
          productBrand={
            productDetails.brandId === undefined ||
            productDetails.brandName === undefined
              ? undefined
              : {
                  id: productDetails.brandId,
                  name: productDetails.brandName,
                }
          }
        />
        <div className="min-w-[300px] max-w-[300px]">
          <PurchaseSection
            productId={productDetails.id}
            price={productDetails.price}
            similarStyleProducts={sameStyleProductsWithImages}
          />
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <SectionHeading text={"Customers also looked at"} />
        <ProductCarousel
          products={customersAlsoLookedAt}
          imageWidth={640}
          imageHeight={853}
        />
      </div>
    </main>
  );
};

export default ProductPage;