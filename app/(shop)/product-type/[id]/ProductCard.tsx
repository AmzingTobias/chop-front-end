import AddToBasketBtn from "@/app/components/product-cards/common/AddToBasketBtn";
import PriceLabel from "@/app/components/product-cards/common/PriceLabel";
import ProductFavouriteBtn from "@/app/components/product-cards/common/ProductFavouriteBtn";
import ProductImageWithHover from "@/app/components/product-cards/common/ProductImageWithHover";
import { IProductEntryWithImages } from "@/app/data/products";
import Link from "next/link";

interface IProductCardProps extends IProductEntryWithImages {}

const ProductCard: React.FC<IProductCardProps> = ({
  productId,
  productPageLink,
  productName,
  brandId,
  brandName,
  image,
  productDescription,
  productPrice,
}) => {
  return (
    <div className="w-full bg-primary h-fit rounded-md flex flex-col ">
      <div className="flex flex-row">
        <Link href={productPageLink} className="min-w-fit h-fit">
          <ProductImageWithHover
            image={image}
            className="rounded-tr-none rounded-l-md "
          />
        </Link>
        <div className="flex flex-col p-2 max-h-[250px]">
          <div className="flex flex-row items-start">
            <Link href={productPageLink}>
              <h2 className="text-2xl font-semibold hover:underline">
                {productName}
              </h2>
            </Link>
            <div className="ml-auto">
              <ProductFavouriteBtn />
            </div>
          </div>
          <Link className="hover:underline" href={`/brands/${brandId}`}>
            {brandName}
          </Link>
          {/* TODO - Turn to elipises */}
          <p className="hidden md:flex font-light italic overflow-hidden line-clamp-1">
            {productDescription}
          </p>
          <div className="flex flex-col mt-auto ml-auto items-end w-fit">
            <PriceLabel price={productPrice} />
            <AddToBasketBtn productId={productId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
