import Link from "next/link";
import PriceLabel from "./common/PriceLabel";
import ProductImageWithHover from "./common/ProductImageWithHover";
import AddToBasketBtn from "./common/AddToBasketBtn";
import { IProductEntryWithImages } from "@/app/data/products";
import RemoveFromViewHistoryBtn from "../products/RemoveFromViewHistoryBtn";

export interface IMiniProductCardProps extends IProductEntryWithImages {
  customerLoggedIn: boolean;
  discountPrice?: number;
  removeFromViewHistory?: (productId: number) => void;
}

const MiniProductCard: React.FC<IMiniProductCardProps> = ({
  customerLoggedIn,
  productId,
  productName,
  productPrice,
  productAvailable,
  productStockCount,
  discountPrice,
  productPageLink,
  image,
  imageWidth,
  imageHeight,
  removeFromViewHistory,
}) => {
  return (
    <div
      style={{ maxWidth: imageHeight }}
      className="bg-primary rounded-md relative flex flex-col w-fit"
    >
      <Link href={productPageLink} className="flex flex-col max-w-full h-full">
        <ProductImageWithHover
          image={image}
          imageWidth={imageWidth}
          imageHeight={imageHeight}
        />
        <div className="p-2 text-accent">
          <h2 className="text-lg font-semibold  inline">{productName}</h2>
        </div>
        <div className="mt-auto p-2">
          <PriceLabel price={productPrice} discountPrice={discountPrice} />
          <AddToBasketBtn
            customerLoggedIn={customerLoggedIn}
            productStockCount={productStockCount}
            productAvailable={productAvailable}
            productId={productId}
          />
        </div>
      </Link>
      {removeFromViewHistory !== undefined && (
        <div className="absolute top-0 right-0 m-2 text-3xl">
          <RemoveFromViewHistoryBtn
            productId={productId}
            removeFromViewHistory={removeFromViewHistory}
          />
        </div>
      )}
    </div>
  );
};

export default MiniProductCard;
