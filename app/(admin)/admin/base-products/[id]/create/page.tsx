import CreateProductForm from "./CreateProductForm";
import ImageAdder from "./ImageAdder";

const Page = ({ params }: { params: { id: number } }) => {
  return (
    <main className="w-full h-screen max-h-screen overflow-clip flex flex-row p-6">
      <CreateProductForm />
    </main>
  );
};

export default Page;
