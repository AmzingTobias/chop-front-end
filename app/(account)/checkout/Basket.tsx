import BasketEntryQuantity from "@/app/(shop)/basket/BasketEntryQuantity";
import ProductImageWithHover from "@/app/components/product-cards/common/ProductImageWithHover";
import { TBasketEntry } from "@/app/data/basket";

interface IBasketProps {
  contents: TBasketEntry[];
}

const Basket: React.FC<IBasketProps> = ({ contents }) => {
  return (
    <div className="flex flex-col gap-4">
      {contents.map((item) => {
        return (
          <div
            key={item.productId}
            className="flex bg-accent text-accent-foreground rounded-md flex-row shadow-md"
          >
            <ProductImageWithHover
              className="rounded-tr-none rounded-l-md"
              image={{ primaryLink: item.productImageURL, altText: "PRODUCT" }}
              imageWidth={80}
              imageHeight={400}
            />
            <div className="flex flex-col p-2 w-full flex-grow">
              <h3 className="text-2xl">{item.productName}</h3>
              <div className="flex flex-row w-full justify-end items-end flex-grow">
                <div className="flex flex-row gap-2 items-center">
                  <small className="font-medium">{item.quantity} x </small>
                  <p className="text-xl font-semibold">
                    £{item.price.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Basket;
