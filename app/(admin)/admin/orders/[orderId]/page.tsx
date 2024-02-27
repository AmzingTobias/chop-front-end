import SectionHeading from "@/app/components/SectionHeading";
import OrderDetails from "./OrderDetails";
import { getAllPossibleOrderStatuses } from "@/app/data/orders";

const Page = async ({ params }: { params: { orderId: number } }) => {
  const allOrderStatusTypes = await getAllPossibleOrderStatuses();

  return (
    <main className="w-full h-screen max-h-screen overflow-clip flex flex-col p-2">
      <SectionHeading text="Order summary" />
      <OrderDetails
        orderId={params.orderId}
        possibleOrderStatuses={allOrderStatusTypes}
      />
    </main>
  );
};

export default Page;
