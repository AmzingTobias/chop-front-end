import { TCustomerAddress } from "@/app/data/address";

interface IDeliveryAddressProps {
  address: TCustomerAddress;
}

const DeliveryAddress: React.FC<IDeliveryAddressProps> = ({ address }) => {
  return (
    <div className="flex flex-col">
      <p>{address.firstAddressLine}</p>
      <p>{address.secondAddressLine}</p>
      <p>{address.areaCode}</p>
      <p>{address.countryState}</p>
      <p>{address.countryName}</p>
    </div>
  );
};

export default DeliveryAddress;
