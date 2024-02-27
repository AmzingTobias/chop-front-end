import CreateProductForm from "./CreateProductForm";

const Page = ({ params }: { params: { baseProductId: number } }) => {
  return (
    <main className="w-full h-screen max-h-screen overflow-y-scroll flex flex-row p-2">
      <CreateProductForm baseProductId={params.baseProductId} />
    </main>
  );
};

export default Page;
