import { IProductEntryWithImages } from "@/app/data/products";
import Image from "next/image";

const ProductCard: React.FC<IProductEntryWithImages> = (props) => {
  return (
    <div
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
    </div>
  );
};

export default ProductCard;
