import { EAccountTypes } from "@/app/data/auth";
import { IProductEntryWithImages } from "@/app/data/products";
import Image from "next/image";
import Link from "next/link";

interface IProductCardProps extends IProductEntryWithImages {
  baseProductId: number;
  accountTypeLoggedIn: EAccountTypes.admin | EAccountTypes.sales;
}

const ProductCard: React.FC<IProductCardProps> = (props) => {
  return (
    <Link
      href={`/${
        props.accountTypeLoggedIn === EAccountTypes.sales ? "sales" : "admin"
      }/products/${props.baseProductId}/${props.productId}`}
      className="w-fit hover:opacity-80 cursor-pointer"
      style={{ maxWidth: props.imageWidth }}
    >
      <Image
        className="rounded-md"
        src={props.image.primaryLink}
        alt="Product"
        width={props.imageWidth}
        height={props.imageHeight}
      />
      <div className="text-sm">
        <h3 className="text-lg font-semibold inline">{props.productName}</h3>
        <h4>Stock count: {props.productStockCount}</h4>
        <h4>Price: £{props.productPrice.toFixed(2)}</h4>
        <h4>{props.productAvailable ? "Available" : "Unavailable"}</h4>
      </div>
    </Link>
  );
};

export default ProductCard;
