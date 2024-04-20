"use client";

import { EAccountTypes } from "@/app/data/auth";
import { IProductEntryWithImages } from "@/app/data/products";
import Image from "next/image";
import Link from "next/link";
import StockAdjuster from "./StockAdjuster";
import { useState } from "react";

interface IProductCardProps extends IProductEntryWithImages {
  baseProductId: number;
  accountTypeLoggedIn:
    | EAccountTypes.admin
    | EAccountTypes.sales
    | EAccountTypes.warehouse;
}

const ProductCard: React.FC<IProductCardProps> = (props) => {
  const [stockQuantity, setStockQuantity] = useState(props.productStockCount);
  const productLink =
    props.accountTypeLoggedIn === EAccountTypes.warehouse
      ? ""
      : `/${
          props.accountTypeLoggedIn === EAccountTypes.sales ? "sales" : "admin"
        }/products/${props.baseProductId}/${props.productId}`;
  return (
    <div className="w-fit">
      <Link
        href={productLink}
        className="block w-fit hover:opacity-80 cursor-pointer"
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
          <h4>Stock count: {stockQuantity}</h4>
          <h4>Price: £{props.productPrice.toFixed(2)}</h4>
          <h4>{props.productAvailable ? "Available" : "Unavailable"}</h4>
        </div>
      </Link>
      <StockAdjuster
        accountTypeLoggedIn={props.accountTypeLoggedIn}
        initialStockQuantity={props.productStockCount}
        setStockQuantity={setStockQuantity}
        productId={props.productId}
      />
    </div>
  );
};

export default ProductCard;
