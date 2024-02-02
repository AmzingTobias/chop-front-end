"use client";

import Image from "next/image";
import { useState } from "react";
import noProductImage from "@/public/no-product.png";

export type TImageDetails = {
  primaryLink: string;
  hoverLink?: string;
  altText: string;
};

interface IProductImageWithHoverProps {
  className?: string;
  image: TImageDetails;
  imageWidth: number;
  imageHeight: number;
}

const ProductImageWithHover: React.FC<IProductImageWithHoverProps> = ({
  className,
  image,
  imageWidth,
  imageHeight,
}) => {
  const [imageToShow, setImageToShow] = useState(image.primaryLink);

  return (
    <Image
      blurDataURL={noProductImage.src}
      placeholder={`blur`}
      className={`rounded-t-md ${className}`}
      onMouseOver={() =>
        image.hoverLink !== undefined ? setImageToShow(image.hoverLink) : <></>
      }
      onMouseOut={() => setImageToShow(image.primaryLink)}
      src={imageToShow}
      alt={image.altText}
      width={imageWidth}
      height={imageHeight}
    />
  );
};

export default ProductImageWithHover;
