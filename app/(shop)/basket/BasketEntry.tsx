import ProductImageWithHover, {
  TImageDetails,
} from "@/app/components/product-cards/common/ProductImageWithHover";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IoCloseOutline } from "react-icons/io5";
import RemoveFromBasketBtn from "./RemoveFromBasketBtn";
import BasketEntryQuantity from "./BasketEntryQuantity";

interface IBasketEntryProps {
  productId: number;
  productName: string;
  productImage: TImageDetails;
  productPrice: number;
  quantity: number;
}

const BasketEntry: React.FC<IBasketEntryProps> = ({
  productId,
  productName,
  productImage,
  productPrice,
  quantity,
}) => {
  return (
    <div className="w-full bg-primary h-[200px] rounded-md flex flex-row space-x-6 shadow-md">
      <Link href={""} className="min-w-fit">
        <ProductImageWithHover
          image={productImage}
          className="rounded-tr-none rounded-l-md "
        />
      </Link>
      <div className="w-full h-full flex flex-row py-2.5 pr-2.5">
        <div className="flex flex-col w-full">
          <Link href={""}>
            <h2 className="text-2xl font-semibold">{productName}</h2>
          </Link>
          {/* <Link className="hover:underline" href={`/brands/${product.brandId}`}>
            {product.brandName}
          </Link> */}
          {/* <p className="font-light italic overflow-hidden">
            {product.productDescription}
          </p> */}
        </div>
        <div className="h-full flex flex-col w-fit justify-end">
          <div className="flex w-fit self-end">
            <RemoveFromBasketBtn productId={productId} />
          </div>
          <div className="flex flex-col mt-auto">
            <BasketEntryQuantity productId={productId} quantity={quantity} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasketEntry;
