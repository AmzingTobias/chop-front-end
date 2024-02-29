import { updateDiscountCode } from "@/app/data/discounts";
import { Input } from "@/components/ui/input";

interface IToggleDiscountCodeProps {
  active: boolean;
  codeId: number;
}

const ToggleDiscountCode: React.FC<IToggleDiscountCodeProps> = ({
  active,
  codeId,
}) => {
  return (
    <Input
      onChange={(event) =>
        updateDiscountCode(codeId, { active: event.currentTarget.checked })
      }
      className="scale-50"
      type="checkbox"
      defaultChecked={active}
    />
  );
};

export default ToggleDiscountCode;
