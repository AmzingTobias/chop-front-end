"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Image from "next/image";
import noProductImage from "@/public/no-product.png";
import { Button } from "@/components/ui/button";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";

interface IProductImageSideDisplayProps {
  images: string[];
  setActiveImage: Dispatch<SetStateAction<number>>;
}

const ProductImageSideDisplay: React.FC<IProductImageSideDisplayProps> = ({
  images,
  setActiveImage,
}) => {
  const scrollBtnStyles =
    "absolute p-1 rounded-none opacity-30 hover:opacity-70 bg-secondary-foreground text-secondary hover:bg-secondary-foreground hover:text-secondary";

  const [scrollAvailable, setScrollAvailable] = useState(false);
  const scrollAreaRef: React.Ref<HTMLDivElement> = useRef(null);
  const productImagesRef: React.Ref<HTMLDivElement> = useRef(null);

  const scrollAreaBy = (multiplier: number) => {
    console.log();
    if (scrollAreaRef.current !== null) {
      if (
        productImagesRef.current !== null &&
        scrollAreaRef.current.parentElement !== null
      ) {
        scrollAreaRef.current.scrollTop +=
          scrollAreaRef.current.parentElement.clientHeight * multiplier;
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (scrollAreaRef.current !== null) {
        setScrollAvailable(
          scrollAreaRef.current.scrollHeight !==
            scrollAreaRef.current.clientHeight
        );
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
  }, [scrollAreaRef]);

  return (
    <ScrollArea ref={scrollAreaRef} className="flex text-accent w-fit">
      <div className="flex flex-col space-y-2" ref={productImagesRef}>
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
      <ScrollBar orientation="vertical" />
      {scrollAvailable ? (
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
    </ScrollArea>
  );
};

export default ProductImageSideDisplay;
