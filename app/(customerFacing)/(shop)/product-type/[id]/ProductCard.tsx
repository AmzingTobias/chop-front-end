import AddToBasketBtn from "@/app/components/product-cards/common/AddToBasketBtn";
import PriceLabel from "@/app/components/product-cards/common/PriceLabel";
import ProductFavouriteBtn from "@/app/components/product-cards/common/ProductFavouriteBtn";
import ProductImageWithHover from "@/app/components/product-cards/common/ProductImageWithHover";
import { EAccountTypes } from "@/app/data/auth";
import { IProductEntryWithImages } from "@/app/data/products";
import Link from "next/link";

interface IProductCardProps extends IProductEntryWithImages {
  accountTypeLoggedIn: EAccountTypes | undefined;
}

const ProductCard: React.FC<IProductCardProps> = ({
  accountTypeLoggedIn,
  productId,
  productPageLink,
  productName,
  brandId,
  brandName,
  image,
  imageWidth,
  imageHeight,
  productDescription,
  productPrice,
  productStockCount,
  productAvailable,
}) => {
  return (
    <div className="w-full bg-primary h-fit rounded-md flex flex-col ">
      <div className="flex flex-row">
        <Link href={productPageLink} className="min-w-fit h-fit">
          <ProductImageWithHover
            image={image}
            imageWidth={imageWidth}
            imageHeight={imageHeight}
            className="rounded-tr-none rounded-l-md "
          />
        </Link>
        <div className="flex flex-col p-2 max-h-[250px] w-full">
          <div className="flex flex-row items-start">
            <Link href={productPageLink}>
              <h2 className="text-md md:text-2xl font-semibold hover:underline line-clamp-3">
                {productName}
              </h2>
            </Link>
            <div className="ml-auto">
              <ProductFavouriteBtn
                productId={productId}
                customerLoggedIn={
                  accountTypeLoggedIn === EAccountTypes.customer
                }
              />
            </div>
          </div>
          <Link className="hover:underline" href={`/brands/${brandId}`}>
            {brandName}
          </Link>
          {/* TODO - Turn to elipises */}
          <p
            className="hidden md:line-clamp-1 lg:line-clamp-2 xl:line-clamp-3 2xl:line-clamp-4 md:overflow-hidden md:font-light md:italic"
            style={{ display: "-moz-initial" }}
          >
            {productDescription}
          </p>
          <div className="flex flex-col mt-auto ml-auto items-end w-fit">
            <PriceLabel price={productPrice} />
            <AddToBasketBtn
              customerLoggedIn={accountTypeLoggedIn === EAccountTypes.customer}
              productStockCount={productStockCount}
              productAvailable={productAvailable}
              productId={productId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
