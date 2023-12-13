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
    <div className="w-full bg-primary h-[250px] rounded-md flex flex-row space-x-6">
      <Link href={productPageLink} className="min-w-fit">
        <ProductImageWithHover
          image={image}
          className="rounded-tr-none rounded-l-md "
        />
      </Link>
      <div className="w-full h-full flex flex-row py-2.5 pr-2.5">
        <div className="flex flex-col w-full">
          <Link href={productPageLink}>
            <h2 className="text-2xl font-semibold hover:underline">
              {productName}
            </h2>
          </Link>
          <Link className="hover:underline" href={`/brands/${brandId}`}>
            {brandName}
          </Link>
          <p className="font-light italic overflow-hidden">
            {productDescription}
          </p>
        </div>
        <div className="h-full flex flex-col w-fit justify-end">
          <div className="flex w-fit self-end">
            <ProductFavouriteBtn />
          </div>
          <div className="flex flex-col mt-auto w-[182px]">
            <PriceLabel price={productPrice} />
            <AddToBasketBtn productId={productId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
