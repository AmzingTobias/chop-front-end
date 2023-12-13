import ProductImageWithHover, {
  TImageDetails,
} from "@/app/components/product-cards/common/ProductImageWithHover";
import Link from "next/link";
import RemoveFromBasketBtn from "./RemoveFromBasketBtn";
import BasketEntryQuantity from "./BasketEntryQuantity";
import Image from "next/image";

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
  const productLink = `/product/${productId}`;

  return (
    <div className="w-full bg-primary h-[200px] rounded-md flex flex-row space-x-4 shadow-md">
      <Link href={productLink} className="min-w-fit">
        <Image
          className={`rounded-l-md`}
          src={productImage.primaryLink}
          alt={productImage.altText}
          width={productImage.width}
          height={productImage.height}
        />
      </Link>
      <div className="w-full h-full flex flex-row py-2.5 pr-2.5">
        <div className="flex flex-col w-full">
          <Link href={productLink}>
            <h2 className="text-2xl font-semibold">{productName}</h2>
          </Link>
        </div>
        <div className="h-full flex flex-col w-fit justify-end">
          <div className="flex w-fit self-end">
            <RemoveFromBasketBtn productId={productId} />
          </div>
          <div className="flex flex-col mt-auto">
            <div className="w-full text-end text-2xl font-medium">
              £{productPrice.toFixed(2)}
            </div>
            <BasketEntryQuantity productId={productId} quantity={quantity} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasketEntry;
