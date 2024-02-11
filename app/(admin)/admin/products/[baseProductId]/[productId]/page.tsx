import UpdateImages from "./UpdateImages";

const Page = ({
  params,
}: {
  params: { baseProductId: number; productId: number };
}) => {
  return (
    <main className="w-full h-screen max-h-screen overflow-y-scroll flex flex-col p-2">
      <UpdateImages productId={params.productId} />
    </main>
  );
};

export default Page;
