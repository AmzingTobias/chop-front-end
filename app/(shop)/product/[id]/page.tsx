import { getProductImages } from "@/app/data/images";
import { getProductWithId } from "@/app/data/products";
import ProductImageDisplay from "./ProductImageDisplay";

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
  const productImages = (await getProductImages(params.id)).map((image) => {
    return `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/images/products/${params.id}/${image.fileName}`;
  });
  return (
    <main className="flex flex-col w-full overflow-x-clip p-1">
      <ProductImageDisplay images={productImages} />
    </main>
  );
};

export default ProductPage;
