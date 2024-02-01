import SectionHeading from "@/app/components/SectionHeading";
import Checkout from "./Checkout";

const Page = () => {
  return (
    <main className="flex flex-col w-full space-y-4 mt-4">
      <SectionHeading text={"Checkout"} />
      <Checkout />
    </main>
  );
};

export default Page;
