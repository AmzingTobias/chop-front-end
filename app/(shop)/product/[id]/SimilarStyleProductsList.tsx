import { IProductEntryWithImages } from "@/app/data/products";
import Image from "next/image";
import Link from "next/link";
import noProductImage from "@/public/no-product.png";

interface ISimilarStyleProductsListProps {
  currentProductId: number;
  products: IProductEntryWithImages[];
}

const SimilarStyleProductsList: React.FC<ISimilarStyleProductsListProps> = ({
  currentProductId,
  products,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      {products.map((product, index) => (
        <Link
          href={`/product/${product.productId}`}
          key={index}
          className={`w-full bg-accent text-accent-foreground rounded-md flex flex-row items-center space-x-2 max-h-[100px] ${
            product.productId !== currentProductId ? "bg-opacity-70" : ""
          }`}
        >
          <Image
            className="rounded-l-md"
            blurDataURL={noProductImage.src}
            placeholder={`blur`}
            src={product.image.primaryLink}
            alt="PRODUCT VARIANT"
            width={75}
            height={100}
          />
          <div className="flex flex-col text-sm space-y-2">
            <h4 className="overflow-ellipsis overflow-hidden max-w-full line-clamp-2">
              {product.productName}
            </h4>
            <h4>£{product.productPrice.toFixed(2)}</h4>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SimilarStyleProductsList;
