import Link from "next/link";
import UpdateImages from "../../../../../(admin)/admin/products/[baseProductId]/[productId]/UpdateImages";
import UpdateProductForm from "../../../../../(admin)/admin/products/[baseProductId]/[productId]/UpdateProductForm";
import { Button } from "@/components/ui/button";

const Page = ({
  params,
}: {
  params: { baseProductId: number; productId: number };
}) => {
  return (
    <main className="w-full h-screen max-h-screen overflow-y-scroll flex flex-col p-2 gap-2">
      <Link className="px-2" href={`/sales/products/${params.baseProductId}`}>
        <Button className="bg-accent hover:bg-opacity-80 w-full">
          Return to base product
        </Button>
      </Link>
      <UpdateImages productId={params.productId} />
      <hr className="border-accent border-[1px] bg-accent" />
      <UpdateProductForm productId={params.productId} />
    </main>
  );
};

export default Page;
