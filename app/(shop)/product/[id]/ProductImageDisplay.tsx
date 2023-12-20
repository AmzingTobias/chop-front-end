"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { useState } from "react";
import noProductImage from "@/public/no-product.png";
import ProductImageSideDisplay from "./ProductImageSideDisplay";

interface IProductImageDisplayProps {
  images: string[];
}

const ProductImageDisplay: React.FC<IProductImageDisplayProps> = ({
  images,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (images.length < 1) {
    return (
      <Image
        className="flex rounded-md w-fit"
        blurDataURL={noProductImage.src}
        placeholder={`blur`}
        alt="MAIN PRODUCT"
        width={400}
        height={400}
        src={noProductImage.src}
      />
    );
  }

  return (
    <div
      className={`flex flex-row max-h-[530px] ${
        images.length > 1 ? "space-x-2" : ""
      } min-w-fit`}
    >
      <ProductImageSideDisplay
        images={images}
        setActiveImage={setActiveImageIndex}
      />
      <Image
        className="flex rounded-md"
        blurDataURL={noProductImage.src}
        placeholder={`blur`}
        loading="eager"
        alt="MAIN PRODUCT"
        width={400}
        height={400}
        src={images[activeImageIndex]}
      />
    </div>
  );
};

export default ProductImageDisplay;
