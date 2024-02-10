import { getProductTypes } from "@/app/data/products";
import BaseProductSideBar from "./BaseProductSideBar";
import ProductGrid from "./ProductGrid";

const Page = async ({ params }: { params: { id: number } }) => {
  const productTypesAvailable = await getProductTypes();
  return (
    <main className="w-full h-screen max-h-screen overflow-clip flex flex-row p-6">
      <div className="pr-6 w-full">
        <ProductGrid baseProductId={params.id} />
      </div>
      <div className="min-w-fit border-l-2 border-accent pl-6">
        <BaseProductSideBar
          productTypes={productTypesAvailable}
          baseProductId={params.id}
        />
      </div>
    </main>
  );
};

export default Page;
