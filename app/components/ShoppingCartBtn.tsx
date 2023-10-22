import { BsCartFill, BsCart } from "react-icons/bs";

interface IShoppingCartBtnProps {
  numInCart: number;
}

const ShoppingCartBtn: React.FC<IShoppingCartBtnProps> = ({ numInCart }) => {
  return (
    <div className="hover:cursor-pointer flex justify-center ">
      {numInCart > 0 ? (
        <>
          <div className="">
            <BsCartFill />
          </div>
          <span className="text-sm ml-0.5 mt-1.5 font-bold absolute text-amber-400">
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
