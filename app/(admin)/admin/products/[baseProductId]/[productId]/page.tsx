import Link from "next/link";
import UpdateImages from "./UpdateImages";
import UpdateProductForm from "./UpdateProductForm";
import { Button } from "@/components/ui/button";
import ProductQuestionReviewTabs from "./ProductQuestionReviewTabs";

const Page = ({
  params,
}: {
  params: { baseProductId: number; productId: number };
}) => {
  return (
    <main className="w-full h-screen max-h-screen overflow-y-scroll flex flex-col p-2 gap-2">
      <Link className="px-2" href={`/admin/products/${params.baseProductId}`}>
        <Button className="bg-accent hover:bg-opacity-80 w-full">
          Return to base product
        </Button>
      </Link>
      <UpdateImages productId={params.productId} />
      <hr className="border-accent border-[1px] bg-accent" />
      <div className="flex flex-row">
        <div className="w-1/2">
          <UpdateProductForm productId={params.productId} />
        </div>
        <div className="bg-accent w-[1px] h-full"></div>
        <div className="w-1/2 p-4">
          <ProductQuestionReviewTabs productId={params.productId} />
        </div>
      </div>
    </main>
  );
};

export default Page;
