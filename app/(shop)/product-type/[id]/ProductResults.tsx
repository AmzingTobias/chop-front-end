"use client";
import ProductCard from "./ProductCard";
import Searchbar from "@/app/components/searchbars/Searchbar";
import Sidebar from "./Sidebar";
import { IProductEntryWithImages } from "@/app/data/products";
import { useState } from "react";
interface IProductResultsProps {
  products: IProductEntryWithImages[];
  productImageWidth?: number;
  productImageHeight?: number;
}

const ProductResults: React.FC<IProductResultsProps> = ({
  products,
  productImageWidth,
  productImageHeight,
}) => {
  const maxProductPrice = products.reduce(
    (prev, item) => (item.productPrice > prev.productPrice ? item : prev),
    { productPrice: 0 }
  ).productPrice;

  const [filteredProducts, setfilteredProducts] = useState(products);

  return (
    <div className="w-full">
      <Searchbar variant="accent" />
      <br className="md:my-4" />
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
            if (productImageHeight !== undefined) {
              product.image.height = productImageHeight;
            }
            if (productImageWidth !== undefined) {
              product.image.width = productImageWidth;
            }
            return (
              <div key={product.productId}>
                <ProductCard
                  productId={product.productId}
                  productPageLink={product.productPageLink}
                  productName={product.productName}
                  brandName={product.brandName}
                  brandId={product.brandId}
                  productDescription={
                    typeof product.productDescription === "string"
                      ? product.productDescription
                      : ""
                  }
                  productPrice={product.productPrice}
                  image={product.image}
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
