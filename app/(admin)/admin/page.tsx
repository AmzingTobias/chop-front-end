import ProductPerformance from "@/components/charts/ProductPerformance";
import ProductViewHistory from "@/components/charts/ProductViewHistory";
import PurchaseAmountPerDate from "@/components/charts/PurchaseAmountPerDate";
import PurchaseAmountPerProductType from "@/components/charts/PurchaseAmountPerProductType";

const Page = () => {
  return (
    <main className="flex max-w-full w-full">
      <div className="flex flex-row bg-accent-foreground w-full max-h-screen gap-2 m-2 overflow-y-scroll">
        <div className="flex flex-col w-2/3 gap-2">
          <PurchaseAmountPerDate />
          <ProductPerformance />
        </div>
        <div className="flex flex-col w-1/3 gap-2">
          <ProductViewHistory />
          <PurchaseAmountPerProductType />
        </div>
      </div>
    </main>
  );
};

export default Page;
