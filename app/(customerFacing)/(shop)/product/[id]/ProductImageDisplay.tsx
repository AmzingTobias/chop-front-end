"use client";
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
  const [touchStartEvent, setTouchStartEvent] = useState<React.TouchEvent>();

  const checkForSwipe = (event: React.TouchEvent) => {
    if (touchStartEvent !== undefined) {
      const xPositionOfTouch = touchStartEvent.touches[0].clientX;
      const xPositionOfTouchLeave = event.changedTouches[0].clientX;
      if (xPositionOfTouch > xPositionOfTouchLeave) {
        // Increase image index
        setActiveImageIndex((prev) =>
          prev < images.length - 1 ? prev + 1 : prev
        );
      } else {
        setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : prev));
      }
      console.log(xPositionOfTouch, xPositionOfTouchLeave);
    }
  };

  if (images.length < 1) {
    return (
      <Image
        className="flex rounded-md w-fit max-h-fit md:max-h-[530px]"
        blurDataURL={noProductImage.src}
        placeholder={`blur`}
        loading="eager"
        alt="MAIN PRODUCT"
        width={400}
        height={530}
        src={noProductImage.src}
      />
    );
  }

  return (
    <div
      className={`flex flex-col-reverse md:flex-row max-h-fit md:max-h-[530px] ${
        images.length > 1
          ? "space-y-2 space-y-reverse md:space-y-0 md:space-x-2"
          : ""
      } min-w-fit`}
    >
      <div className="flex md:hidden">
        <ProductImageSideDisplay
          orientation="horizontal"
          images={images}
          setActiveImage={setActiveImageIndex}
        />
      </div>
      <div className="hidden md:flex">
        <ProductImageSideDisplay
          orientation="vertical"
          images={images}
          setActiveImage={setActiveImageIndex}
        />
      </div>
      <Image
        className="flex rounded-md"
        blurDataURL={noProductImage.src}
        placeholder={`blur`}
        loading="eager"
        alt="MAIN PRODUCT"
        width={400}
        height={530}
        onTouchEnd={(event) => checkForSwipe(event)}
        onTouchStart={(event) => setTouchStartEvent(event)}
        src={images[activeImageIndex]}
      />
    </div>
  );
};

export default ProductImageDisplay;
