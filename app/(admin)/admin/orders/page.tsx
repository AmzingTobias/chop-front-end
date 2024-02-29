import { getAllPossibleOrderStatuses } from "@/app/data/orders";
import OrdersContent from "./OrdersContent";

const Page = async () => {
  const allOrderStatusTypes = await getAllPossibleOrderStatuses();
  return (
    <main className="w-full h-screen max-h-screen overflow-clip flex p-2">
      <OrdersContent allOrderStatusTypes={allOrderStatusTypes} />
    </main>
  );
};

export default Page;
