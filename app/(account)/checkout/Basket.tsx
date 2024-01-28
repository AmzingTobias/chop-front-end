import { TBasketEntry } from "@/app/data/basket";

interface IBasketProps {
  contents: TBasketEntry[];
}

const Basket: React.FC<IBasketProps> = ({ contents }) => {
  return (
    <div>
      {contents.map((item) => {
        return (
          <div key={item.productId}>
            <p>{item.productName}</p>
            <p>{item.quantity}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Basket;
