import Link from "next/link";
import PriceLabel from "./common/PriceLabel";
import ProductImageWithHover, {
  TImageDetails,
} from "./common/ProductImageWithHover";
import AddToBasketBtn from "./common/AddToBasketBtn";
import { IProductEntryWithImages } from "@/app/data/products";

export interface IMiniProductCardProps extends IProductEntryWithImages {
  discountPrice?: number;
}

const MiniProductCard: React.FC<IMiniProductCardProps> = ({
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
}) => {
  return (
    <div
      style={{ maxWidth: imageHeight }}
      className="bg-primary rounded-md flex flex-col w-fit"
    >
      <Link href={productPageLink} className="flex flex-col max-w-full h-full">
        {/* <div className="absolute top-0 right-0 m-2 text-3xl"> */}
        {/* <ProductFavouriteBtn /> */}
        {/* </div> */}
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
            productStockCount={productStockCount}
            productAvailable={productAvailable}
            productId={productId}
          />
        </div>
      </Link>
    </div>
  );
};

export default MiniProductCard;
