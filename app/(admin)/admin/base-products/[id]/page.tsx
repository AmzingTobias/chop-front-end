import ProductGrid from "./ProductGrid";

const Page = ({ params }: { params: { id: number } }) => {
  return (
    <main className="w-full max-h-full overflow-hidden">
      <ProductGrid baseProductId={params.id} />
    </main>
  );
};

export default Page;
