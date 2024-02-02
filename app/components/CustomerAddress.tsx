import { cn } from "@/lib/utils";
import { TCustomerAddress } from "../data/address";

interface IAddressProps {
  address: TCustomerAddress;
  className?: string;
}

const Address: React.FC<IAddressProps> = ({ address, className = "" }) => {
  return (
    <div className={cn("flex flex-col", className)}>
      <p>{address.firstAddressLine}</p>
      <p>{address.secondAddressLine}</p>
      <p>{address.countryState}</p>
      <p>{address.areaCode}</p>
      <p>{address.countryName}</p>
    </div>
  );
};

export default Address;
