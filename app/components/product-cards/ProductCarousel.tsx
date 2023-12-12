"use client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import MiniProductCard, { IMiniProductCardProps } from "./MiniProductCard";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
interface IProductCarouselProps {
  products: IMiniProductCardProps[];
}

const ProductCarousel: React.FC<IProductCarouselProps> = ({ products }) => {
  const scrollBtnStyles =
    "absolute p-1 top-1/2 rounded-none opacity-80 hover:opacity-100 bg-secondary-foreground text-secondary hover:bg-secondary-foreground hover:text-secondary";

  const scrollAreaRef: React.Ref<HTMLDivElement> = useRef(null);
  const productDivRef: React.Ref<HTMLDivElement> = useRef(null);
  const [scrollAvailable, setScrollAvailable] = useState(false);

  const scrollAreaBy = (multiplier: number) => {
    if (scrollAreaRef.current !== null) {
      if (
        productDivRef.current !== null &&
        scrollAreaRef.current.parentElement !== null
      ) {
        scrollAreaRef.current.scrollLeft +=
          scrollAreaRef.current.parentElement.clientWidth * multiplier;
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (scrollAreaRef.current !== null) {
        setScrollAvailable(
          scrollAreaRef.current.scrollWidth !==
            scrollAreaRef.current.clientWidth
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
    <ScrollArea
      ref={scrollAreaRef}
      className="rounded-md pb-4 overflow-x: scroll"
    >
      <div ref={productDivRef} className="flex space-x-8 ">
        {products.map((product) => {
          return (
            <div key={product.productId} className="min-w-[200px] flex grow">
              <MiniProductCard
                productId={product.productId}
                productName={product.productName}
                image={product.image}
                productPageLink={product.productPageLink}
                productPrice={product.productPrice}
              />
            </div>
          );
        })}
      </div>
      <ScrollBar orientation="horizontal" />
      {scrollAvailable ? (
        <>
          <Button
            className={`${scrollBtnStyles}`}
            variant="secondary"
            onClick={() => scrollAreaBy(-1)}
          >
            <BsArrowLeft className="text-3xl" />
          </Button>
          <Button
            className={`${scrollBtnStyles} right-0`}
            variant="secondary"
            onClick={() => scrollAreaBy(1)}
          >
            <BsArrowRight className="text-3xl" />
          </Button>
        </>
      ) : (
        <></>
      )}
    </ScrollArea>
  );
};

export default ProductCarousel;
