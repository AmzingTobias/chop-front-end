import { addToCart, removeOneFromCart } from "@/app/redux/slices/basket.slice";
import { Button } from "@/components/ui/button";
import { IoAdd, IoRemove } from "react-icons/io5";
import { useDispatch } from "react-redux";

interface IBasketEntryQuantityProps {
  productId: number;
  quantity: number;
}
const BasketEntryQuantity: React.FC<IBasketEntryQuantityProps> = ({
  productId,
  quantity,
}) => {
  const dispatch = useDispatch();

  const increaseQuantity = () => {
    dispatch(addToCart({ productId: productId }));
  };

  const decreaseQuantity = () => {
    dispatch(removeOneFromCart({ productId: productId }));
  };

  return (
    <div className="flex flex-row items-center space-x-2">
      <Button
        variant={"secondary"}
        className="w-10 h-10 p-0.5"
        onClick={() => decreaseQuantity()}
        disabled={quantity <= 1}
      >
        <IoRemove className={"text-xl"} />
      </Button>
      <div className="w-10 h-10 bg-secondary rounded-md text-secondary-foreground flex align-middle items-center">
        <p className="w-full text-center">{quantity}</p>
      </div>
      <Button
        variant={"secondary"}
        className="w-10 h-10 p-0.5"
        onClick={() => increaseQuantity()}
      >
        <IoAdd className={"text-xl"} />
      </Button>
    </div>
  );
};

export default BasketEntryQuantity;
