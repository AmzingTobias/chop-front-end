import { updateDiscountCode } from "@/app/data/discounts";
import { Input } from "@/components/ui/input";

interface IToggleDiscountCodeStackableProps {
  stackable: boolean;
  codeId: number;
}

const ToggleDiscountCodeStackable: React.FC<
  IToggleDiscountCodeStackableProps
> = ({ stackable, codeId }) => {
  return (
    <Input
      onChange={(event) =>
        updateDiscountCode(codeId, { stackable: event.currentTarget.checked })
      }
      className="scale-50"
      type="checkbox"
      defaultChecked={stackable}
    />
  );
};

export default ToggleDiscountCodeStackable;
