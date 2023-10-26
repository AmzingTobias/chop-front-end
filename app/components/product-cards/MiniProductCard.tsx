import Link from "next/link";
import PriceLabel from "./common/PriceLabel";
import ProductImageWithHover, {
  TImageDetails,
} from "./common/ProductImageWithHover";
import ProductFavouriteBtn from "./common/ProductFavouriteBtn";

export interface IMiniProductCardProps {
  productName: string;
  productPrice: number;
  discountPrice?: number;
  productPageLink: string;
  image: TImageDetails;
}

const MiniProductCard: React.FC<IMiniProductCardProps> = ({
  productName,
  productPrice,
  discountPrice,
  productPageLink,
  image,
}) => {
  return (
    <div style={{ maxWidth: image.width }}>
      <Link href={productPageLink} className="w-full h-full">
        <div className="relative">
          <div className="absolute top-0 right-0 m-2 text-3xl">
            <ProductFavouriteBtn />
          </div>
          <ProductImageWithHover image={image} />
        </div>
        <div className="p-3">
          <h2 className="text-xl font-semibold">{productName}</h2>
          <PriceLabel price={productPrice} discountPrice={discountPrice} />
        </div>
      </Link>
    </div>
  );
};

export default MiniProductCard;
