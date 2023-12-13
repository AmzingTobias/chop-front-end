import { TImageDetails } from "@/app/components/product-cards/common/ProductImageWithHover";
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
    <div className="w-full bg-primary h-full md:h-[200px] rounded-md flex flex-col shadow-md">
      <div className="flex flex-rows space-x-2 md:space-x-4">
        <div className="min-w-fit flex flex-col">
          <Link href={productLink} className="min-w-fit">
            <Image
              className={`rounded-tl-md md:rounded-l-md`}
              src={productImage.primaryLink}
              alt={productImage.altText}
              width={productImage.width}
              height={productImage.height}
            />
          </Link>
        </div>
        <div className="w-full md:h-[200px] flex flex-col md:flex-row py-2.5 pr-2.5">
          <div className="flex flex-col w-full">
            <Link href={productLink} className="md:h-full md:block">
              <h2 className="text-lg md:text-2xl font-semibold md:max-h-full overflow-ellipsis overflow-hidden max-w-full line-clamp-5">
                {productName}
              </h2>
            </Link>
          </div>
          <div className="md:h-full flex flex-col w-fit justify-end">
            <div className="w-fit hidden md:flex self-end">
              <RemoveFromBasketBtn productId={productId} />
            </div>
            <div className="flex flex-col mt-auto">
              <div className="w-full text-end text-lg md:text-2xl font-bold md:font-medium">
                £{productPrice.toFixed(2)}
              </div>
              <div className="hidden md:flex">
                <BasketEntryQuantity
                  productId={productId}
                  quantity={quantity}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row w-full p-2 md:hidden">
        <div className="w-full">
          <BasketEntryQuantity productId={productId} quantity={quantity} />
        </div>
        <div className="justify-end">
          <RemoveFromBasketBtn productId={productId} />
        </div>
      </div>
    </div>
  );
};

export default BasketEntry;
