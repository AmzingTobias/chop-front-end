import MiniProductCard, { IMiniProductCardProps } from "./MiniProductCard";

interface IProductGridMini {
  gridColumnMinRem: number;
  products: IMiniProductCardProps[];
}

const ProductGridMini: React.FC<IProductGridMini> = ({
  gridColumnMinRem,
  products,
}) => {
  return (
    <div className="flex w-full justify-center">
      <div
        style={{
          gridTemplateColumns: `repeat(auto-fill, minmax(min(${gridColumnMinRem}rem, 100%), 1fr))`,
        }}
        className="grid w-full justify-items-center gap-x-4 gap-y-2"
      >
        {products.map((product, index) => {
          return (
            <div key={index} className="flex grow">
              <MiniProductCard
                image={product.image}
                productName={product.productName}
                productPrice={product.productPrice}
                productPageLink={product.productPageLink}
                discountPrice={product.discountPrice}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductGridMini;
