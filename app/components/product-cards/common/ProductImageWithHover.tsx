"use client";

import Image from "next/image";
import { useState } from "react";

export type TImageDetails = {
  primaryLink: string;
  hoverLink?: string;
  width: number;
  height: number;
  altText: string;
};

interface IProductImageWithHoverProps {
  className?: string;
  image: TImageDetails;
}

const ProductImageWithHover: React.FC<IProductImageWithHoverProps> = ({
  className,
  image,
}) => {
  const [imageToShow, setImageToShow] = useState(image.primaryLink);

  return (
    <Image
      className={`rounded-t-md ${className}`}
      onMouseOver={() =>
        image.hoverLink !== undefined ? setImageToShow(image.hoverLink) : <></>
      }
      onMouseOut={() => setImageToShow(image.primaryLink)}
      src={imageToShow}
      alt={image.altText}
      width={image.width}
      height={image.height}
    />
  );
};

export default ProductImageWithHover;
