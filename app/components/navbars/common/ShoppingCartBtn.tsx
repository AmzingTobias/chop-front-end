import { BsCartFill, BsCart } from "react-icons/bs";

interface IShoppingCartBtnProps {
  numInCart: number;
}

const ShoppingCartBtn: React.FC<IShoppingCartBtnProps> = ({ numInCart }) => {
  return (
    <div className="hover:cursor-pointer flex justify-center hover:text-gray-400">
      {numInCart > 0 ? (
        <>
          <BsCartFill />
          <span className="text-sm ml-0.5 mt-1.5 font-bold absolute select-none text-indigo-900">
            {numInCart > 9 ? "9+" : numInCart}
          </span>
        </>
      ) : (
        <BsCart />
      )}
    </div>
  );
};

export default ShoppingCartBtn;
