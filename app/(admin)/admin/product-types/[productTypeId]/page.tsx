import ProductTypeProductContent from "./ProductTypeProductContent";

const Page = ({ params }: { params: { productTypeId: number } }) => {
  return (
    <main className="w-full h-screen max-h-screen overflow-clip flex flex-row p-4">
      <ProductTypeProductContent productTypeId={params.productTypeId} />
    </main>
  );
};

export default Page;
