import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface IFilterAccountsProps {
  onFilterChange: (value: string) => void;
}

const FilterAccounts: React.FC<IFilterAccountsProps> = ({ onFilterChange }) => {
  const filterOptions: { display: string; value: string }[] = [
    { display: "All", value: "-1" },
    { display: "Customer", value: "0" },
    { display: "Sales", value: "1" },
    { display: "Support", value: "2" },
    { display: "Admin", value: "3" },
    { display: "Warehouse", value: "4" },
  ];

  return (
    <RadioGroup
      defaultValue="-1"
      className="flex flex-row"
      onValueChange={onFilterChange}
    >
      {filterOptions.map((option, index) => (
        <div key={index} className="flex items-center space-x-2">
          <RadioGroupItem
            value={option.value}
            id={`${option.value}-radio-group`}
          />
          <Label htmlFor={`${option.value}-radio-group`}>
            {option.display}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};

export default FilterAccounts;
