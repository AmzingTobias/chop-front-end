import QuantityControlBtns from "@/app/components/products/QuantityControlBtns";
import { updateProductInBasket } from "@/app/data/basket";
import { addToCart, removeOneFromCart } from "@/app/redux/slices/basket.slice";
import { useDispatch } from "react-redux";

interface IBasketEntryQuantityProps {
  productId: number;
  disable?: boolean;
  customerLoggedIn: boolean;
  quantity: number;
  productStockCount: number;
  productAvailable: boolean;
}
const BasketEntryQuantity: React.FC<IBasketEntryQuantityProps> = ({
  productId,
  customerLoggedIn,
  disable = false,
  quantity,
  productAvailable,
  productStockCount,
}) => {
  const dispatch = useDispatch();

  const increaseQuantity = () => {
    if (customerLoggedIn) {
      // Update server side basket
      updateProductInBasket(productId, quantity + 1);
    } else {
      dispatch(addToCart({ productId: productId, quantity: 1 }));
    }
  };

  const decreaseQuantity = () => {
    if (customerLoggedIn) {
      // Update server side basket
      updateProductInBasket(productId, quantity - 1);
    } else {
      dispatch(removeOneFromCart({ productId: productId }));
    }
  };

  return (
    <QuantityControlBtns
      disabled={!productAvailable || productStockCount <= 0 || disable}
      maxQuantityAllowed={productStockCount}
      quantityAmount={quantity}
      increaseQuantity={increaseQuantity}
      decreaseQuantity={decreaseQuantity}
    />
  );
};

export default BasketEntryQuantity;
