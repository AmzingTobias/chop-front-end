import SectionHeading from "@/app/components/SectionHeading";
import CustomersOrders from "./CustomersOrders";

const Page = () => {
  return (
    <main className="flex flex-col w-full p-4 mx-auto max-w-screen-2xl">
      <SectionHeading text="Your orders" />
      <CustomersOrders />
    </main>
  );
};

export default Page;
