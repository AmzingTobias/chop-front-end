import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface IPaymentInfoProps {}

const PaymentInfo: React.FC<IPaymentInfoProps> = () => {
  return (
    <div className="flex-col">
      <p>PayPal</p>
      <form className="flex flex-row gap-2">
        <Input className="h-8" type="text" placeholder="Offer code" />
        <Button className="h-8" variant={"secondary"}>
          Apply
        </Button>
      </form>
    </div>
  );
};

export default PaymentInfo;
