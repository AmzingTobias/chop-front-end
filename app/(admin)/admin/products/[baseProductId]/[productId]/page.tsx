const Page = ({
  params,
}: {
  params: { baseProductId: number; productId: number };
}) => {
  return (
    <main>
      <h3>{params.baseProductId}</h3>
      <h3>{params.productId}</h3>
    </main>
  );
};

export default Page;
