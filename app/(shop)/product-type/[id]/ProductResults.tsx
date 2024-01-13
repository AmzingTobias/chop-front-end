"use client";
import { EAccountTypes } from "@/app/data/auth";
import ProductCard from "./ProductCard";
import Sidebar from "./Sidebar";
import { IProductEntryWithImages } from "@/app/data/products";
import { useEffect, useState } from "react";
interface IProductResultsProps {
  accountTypeLoggedIn: EAccountTypes | undefined;
  products: IProductEntryWithImages[];
  productImageWidth: number;
  productImageHeight: number;
}

const ProductResults: React.FC<IProductResultsProps> = ({
  accountTypeLoggedIn,
  products,
  productImageWidth,
  productImageHeight,
}) => {
  const [maxProductPrice, setMaxProductPrice] = useState(0);
  const [filteredProducts, setfilteredProducts] = useState(products);

  useEffect(() => {
    const getMaxProductPrice = () => {
      return products.reduce(
        (prev, item) => (item.productPrice > prev.productPrice ? item : prev),
        { productPrice: 0 }
      ).productPrice;
    };

    setMaxProductPrice(getMaxProductPrice());
    setfilteredProducts(products);
  }, [products]);

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
        <div className="w-full md:w-1/3 h-fit bg-accent rounded-md text-accent-foreground p-4">
          <Sidebar
            minProductPrice={0}
            maxProductPrice={maxProductPrice}
            originalProductList={products}
            setFilteredProductList={setfilteredProducts}
          />
        </div>
        <div className="flex flex-col gap-8 w-full md:w-2/3">
          {filteredProducts.map((product) => {
            return (
              <div key={product.productId}>
                <ProductCard
                  accountTypeLoggedIn={accountTypeLoggedIn}
                  productId={product.productId}
                  productPageLink={product.productPageLink}
                  productName={product.productName}
                  brandName={product.brandName}
                  productAvailable={product.productAvailable}
                  productStockCount={product.productStockCount}
                  brandId={product.brandId}
                  productDescription={
                    typeof product.productDescription === "string"
                      ? product.productDescription
                      : ""
                  }
                  productPrice={product.productPrice}
                  image={product.image}
                  imageWidth={productImageWidth}
                  imageHeight={productImageHeight}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductResults;
