import ProductFavouriteBtn from "@/app/components/product-cards/common/ProductFavouriteBtn";
import { EAccountTypes } from "@/app/data/auth";
import Link from "next/link";

interface IMainProductSectionProps {
  productId: number;
  productName: string;
  productBrand?: { id: number; name: string };
  productDescription: string;
  accountTypeLoggedIn: EAccountTypes | undefined;
}

const MainProductSection: React.FC<IMainProductSectionProps> = ({
  productId,
  productName,
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
            customerLoggedIn={accountTypeLoggedIn === EAccountTypes.customer}
          />
        </div>
      </div>
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
