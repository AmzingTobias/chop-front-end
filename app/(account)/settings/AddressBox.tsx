import CustomerAddress from "@/app/components/CustomerAddress";
import { TCustomerAddress } from "@/app/data/address";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

interface IAddressBoxProps {
  address: TCustomerAddress;
  isDefault: boolean;
  setDefaultAddress: (addressId: number) => void;
  deleteAddressAction: (addressIdToDelete: number) => void;
}

const AddressBox: React.FC<IAddressBoxProps> = ({
  isDefault,
  address,
  setDefaultAddress,
  deleteAddressAction,
}) => {
  const [addressBeingDeleted, setAddressBeingDeleted] = useState(false);

  useEffect(() => {
    setAddressBeingDeleted(false);
  }, [address.id]);

  return (
    <div
      className={`w-full bg-accent text-accent-foreground rounded-sm shadow-md pt-6 px-6 flex flex-row ${
        isDefault ? " border-secondary border-0" : ""
      }`}
    >
      <div className="flex flex-col">
        <CustomerAddress address={address} className="space-y-0.5" />
        {isDefault ? (
          <h4 className="italic font-light my-4">
            This is your default address
          </h4>
        ) : (
          <>
            <div className="flex items-center space-x-1 my-4">
              <Input
                className="w-6"
                type="checkbox"
                onChange={(event) => {
                  if (address.id !== undefined && event.target.checked) {
                    setDefaultAddress(address.id);
                  }
                }}
              />
              <Label className="font-medium text-base">Set as default</Label>
            </div>
          </>
        )}
      </div>
      <div className="flex ml-auto items-center h-fit">
        <Button
          disabled={addressBeingDeleted}
          className="text-base p-3"
          variant={"secondary"}
          onClick={() => {
            if (address.id !== undefined) {
              setAddressBeingDeleted(true);
              deleteAddressAction(address.id);
            }
          }}
        >
          {addressBeingDeleted ? (
            <Loader2 className="w-4 h-4 mr-1 animate-spin" />
          ) : (
            <MdDelete />
          )}
          <p>Delete</p>
        </Button>
      </div>
    </div>
  );
};

export default AddressBox;
