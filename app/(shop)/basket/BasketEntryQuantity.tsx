import QuantityControlBtns from "@/app/components/products/QuantityControlBtns";
import { addToCart, removeOneFromCart } from "@/app/redux/slices/basket.slice";
import { useDispatch } from "react-redux";

interface IBasketEntryQuantityProps {
  productId: number;
  quantity: number;
  productStockCount: number;
  productAvailable: boolean;
}
const BasketEntryQuantity: React.FC<IBasketEntryQuantityProps> = ({
  productId,
  quantity,
  productAvailable,
  productStockCount,
}) => {
  const dispatch = useDispatch();

  const increaseQuantity = () => {
    dispatch(addToCart({ productId: productId }));
  };

  const decreaseQuantity = () => {
    dispatch(removeOneFromCart({ productId: productId }));
  };

  return (
    <QuantityControlBtns
      disabled={!productAvailable || productStockCount <= 0}
      maxQuantityAllowed={productStockCount}
      quantityAmount={quantity}
      increaseQuantity={increaseQuantity}
      decreaseQuantity={decreaseQuantity}
    />
  );
};

export default BasketEntryQuantity;
