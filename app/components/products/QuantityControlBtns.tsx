import { Button } from "@/components/ui/button";
import { IoAdd, IoRemove } from "react-icons/io5";

interface IQuantityControlBtnsProps {
  quantityAmount: number;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
}

const QuantityControlBtns: React.FC<IQuantityControlBtnsProps> = ({
  quantityAmount,
  increaseQuantity,
  decreaseQuantity,
}) => {
  return (
    <div className="flex flex-row items-center space-x-2">
      <Button
        variant={"secondary"}
        className="w-10 h-10 p-0.5"
        onClick={() => decreaseQuantity()}
        disabled={quantityAmount <= 1}
      >
        <IoRemove className={"text-xl"} />
      </Button>
      <div className="w-10 h-10 bg-secondary rounded-md text-secondary-foreground flex align-middle items-center">
        <p className="w-full text-center">{quantityAmount}</p>
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

export default QuantityControlBtns;
