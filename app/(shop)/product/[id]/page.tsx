import { getProductImages } from "@/app/data/images";
import { getProductWithId } from "@/app/data/products";
import ProductImageDisplay from "./ProductImageDisplay";
import MainProductSection from "./MainProductSection";

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
  return (
    <main className="flex flex-row w-full overflow-x-clip p-1 space-x-2">
      <ProductImageDisplay images={productImages} />
      <MainProductSection
        productId={params.id}
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
    </main>
  );
};

export default ProductPage;
