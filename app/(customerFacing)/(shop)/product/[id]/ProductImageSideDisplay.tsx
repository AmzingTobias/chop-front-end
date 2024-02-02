"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Image from "next/image";
import noProductImage from "@/public/no-product.png";
import { Button } from "@/components/ui/button";
import {
  BsArrowUp,
  BsArrowDown,
  BsArrowLeft,
  BsArrowRight,
} from "react-icons/bs";

interface IProductImageSideDisplayProps {
  images: string[];
  orientation?: "vertical" | "horizontal";
  setActiveImage: Dispatch<SetStateAction<number>>;
}

const ProductImageSideDisplay: React.FC<IProductImageSideDisplayProps> = ({
  orientation = "vertical",
  images,
  setActiveImage,
}) => {
  const scrollBtnStyles =
    "absolute p-1 rounded-none opacity-40 hover:opacity-70 bg-secondary-foreground text-secondary hover:bg-secondary-foreground hover:text-secondary";

  const [scrollAvailable, setScrollAvailable] = useState(false);
  const scrollAreaRef: React.Ref<HTMLDivElement> = useRef(null);
  const productImagesRef: React.Ref<HTMLDivElement> = useRef(null);

  const scrollAreaBy = (multiplier: number) => {
    if (scrollAreaRef.current !== null) {
      if (
        productImagesRef.current !== null &&
        scrollAreaRef.current.parentElement !== null
      ) {
        if (orientation === "vertical") {
          scrollAreaRef.current.scrollTop +=
            scrollAreaRef.current.parentElement.clientHeight * multiplier;
        } else {
          scrollAreaRef.current.scrollLeft +=
            scrollAreaRef.current.parentElement.clientWidth * multiplier;
        }
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (scrollAreaRef.current !== null) {
        if (orientation === "vertical") {
          setScrollAvailable(
            scrollAreaRef.current.scrollHeight !==
              scrollAreaRef.current.clientHeight
          );
        } else {
          setScrollAvailable(
            scrollAreaRef.current.scrollWidth !==
              scrollAreaRef.current.clientWidth
          );
        }
      }
    };

    // Initial check
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [scrollAreaRef, orientation]);

  return (
    <ScrollArea ref={scrollAreaRef} className="flex text-accent md:w-fit">
      <div
        className={`flex md:space-x-0 ${
          orientation === "vertical"
            ? "flex-col space-y-2"
            : "flex-row space-x-2"
        }`}
        ref={productImagesRef}
      >
        {images.map((image, index) => (
          <Image
            className="flex rounded-md cursor-pointer"
            blurDataURL={noProductImage.src}
            placeholder={`blur`}
            loading="eager"
            key={index}
            alt="PRODUCT"
            width={75}
            height={100}
            src={image}
            onClick={(event) => {
              event.preventDefault();
              setActiveImage(index);
            }}
          />
        ))}
      </div>
      <ScrollBar orientation={orientation} className="hidden md:flex" />
      {scrollAvailable && orientation === "vertical" ? (
        <>
          <Button
            className={`${scrollBtnStyles} top-0 w-full`}
            variant="secondary"
            onClick={() => scrollAreaBy(-1)}
          >
            <BsArrowUp className="text-2xl " />
          </Button>
          <Button
            className={`${scrollBtnStyles} bottom-0 w-full`}
            variant="secondary"
            onClick={() => scrollAreaBy(1)}
          >
            <BsArrowDown className="text-2xl" />
          </Button>
        </>
      ) : (
        <></>
      )}
      {scrollAvailable && orientation === "horizontal" ? (
        <>
          <Button
            className={`${scrollBtnStyles} items-center top-0 h-full left-0`}
            variant="secondary"
            onClick={() => scrollAreaBy(-1)}
          >
            <BsArrowLeft className="text-2xl " />
          </Button>
          <Button
            className={`${scrollBtnStyles} items-center top-0 h-full right-0`}
            variant="secondary"
            onClick={() => scrollAreaBy(1)}
          >
            <BsArrowRight className="text-2xl" />
          </Button>
        </>
      ) : (
        <></>
      )}
    </ScrollArea>
  );
};

export default ProductImageSideDisplay;
