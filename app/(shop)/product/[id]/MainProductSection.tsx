import ProductFavouriteBtn from "@/app/components/product-cards/common/ProductFavouriteBtn";
import { EAccountTypes } from "@/app/data/auth";
import Link from "next/link";
import ProductReviewRating from "./ProductReviewRating";

interface IMainProductSectionProps {
  productId: number;
  productName: string;
  reviewCount: number;
  rating: number;
  productBrand?: { id: number; name: string };
  productDescription: string;
  accountTypeLoggedIn: EAccountTypes | undefined;
}

const MainProductSection: React.FC<IMainProductSectionProps> = ({
  productId,
  productName,
  reviewCount,
  rating,
  productDescription,
  productBrand,
  accountTypeLoggedIn,
}) => {
  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-row items-start">
        <h2 className="font-semibold text-3xl">{productName}</h2>
        <div className="ml-auto">
          <ProductFavouriteBtn
            productId={productId}
            customerLoggedIn={accountTypeLoggedIn === EAccountTypes.customer}
          />
        </div>
      </div>
      {reviewCount > 0 ? (
        <>
          <ProductReviewRating numberOfStars={5} rating={rating / 2.0} />
          <small className="italic">
            {reviewCount} review{reviewCount > 1 ? "s" : ""}
          </small>
        </>
      ) : (
        <small className="italic">No reviews yet</small>
      )}
      {productBrand && (
        <Link
          className="hover:underline font-medium"
          href={`/brands/${productBrand?.id}`}
        >
          {productBrand?.name}
        </Link>
      )}
      <p className="font-light">{productDescription}</p>
    </div>
  );
};

export default MainProductSection;
