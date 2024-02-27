import { TDiscountCodeEntry } from "@/app/data/discounts";
import NewDiscountCodeForm from "./NewDiscountCodeForm";

interface ISidebarProps {
  discountCodes: TDiscountCodeEntry[];
  refreshCodes: () => void;
}

const Sidebar: React.FC<ISidebarProps> = ({ discountCodes, refreshCodes }) => {
  return (
    <div className="h-full flex flex-col gap-4 w-full">
      <NewDiscountCodeForm
        discountCodes={discountCodes}
        refreshCodes={refreshCodes}
      />
    </div>
  );
};

export default Sidebar;
