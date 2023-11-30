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
  productName,
  productPrice,
  discountPrice,
  productPageLink,
  image,
}) => {
  return (
    <div
      style={{ maxWidth: image.width }}
      className="bg-primary rounded-md flex flex-col"
    >
      <Link href={productPageLink} className="flex flex-col w-full h-full">
        <div className="mb-2">
          <div className="relative ">
            {/* <div className="absolute top-0 right-0 m-2 text-3xl"> */}
            {/* <ProductFavouriteBtn /> */}
            {/* </div> */}
            <ProductImageWithHover image={image} />
          </div>
          <div className="p-1 text-accent">
            <h2 className="text-lg font-semibold  inline">{productName}</h2>
          </div>
        </div>
        <div className="mt-auto p-1">
          <PriceLabel price={productPrice} discountPrice={discountPrice} />
          <AddToBasketBtn />
        </div>
      </Link>
    </div>
  );
};

export default MiniProductCard;
