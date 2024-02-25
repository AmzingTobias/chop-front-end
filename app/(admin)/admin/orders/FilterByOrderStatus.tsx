import { TOrderStatus } from "@/app/data/orders";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface IFilterByOrderStatusProps {
  onFilterChange: (value: string) => void;
  allOrderStatusTypes: TOrderStatus[];
}

const FilterByOrderStatus: React.FC<IFilterByOrderStatusProps> = ({
  onFilterChange,
  allOrderStatusTypes,
}) => {
  return (
    <RadioGroup
      defaultValue="All"
      className="flex flex-row"
      onValueChange={onFilterChange}
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="All" id={`all-radio-group`} />
        <Label htmlFor={`all-radio-group`}>All</Label>
      </div>
      {allOrderStatusTypes.map((statusDetails, index) => (
        <div key={statusDetails.id} className="flex items-center space-x-2">
          <RadioGroupItem
            value={statusDetails.status}
            id={`${statusDetails.status}-radio-group`}
          />
          <Label htmlFor={`${statusDetails.status}-radio-group`}>
            {statusDetails.status}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};

export default FilterByOrderStatus;
