import BrandProductContent from "./BrandProductContent";

const Page = ({ params }: { params: { brandId: number } }) => {
  return (
    <main className="w-full h-screen max-h-screen overflow-clip flex flex-row p-4">
      <BrandProductContent brandId={params.brandId} />
    </main>
  );
};

export default Page;
