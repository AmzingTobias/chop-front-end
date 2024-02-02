import {
  TDiscountCodeValidation,
  validateDiscountCode,
} from "@/app/data/discounts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";

interface IPaymentInfoProps {
  codesInUse: TDiscountCodeValidation[];
  setCodesInUse: React.Dispatch<
    React.SetStateAction<TDiscountCodeValidation[]>
  >;
}

const PaymentInfo: React.FC<IPaymentInfoProps> = ({
  codesInUse,
  setCodesInUse,
}) => {
  const [discountCodeError, setDiscountCodeError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [serverRequestInProgress, setServerRequestInProgress] = useState(false);

  const moreCodesAllowed = codesInUse.reduce(
    (prev, current) => (prev === false ? prev : current.stackable),
    true
  );

  const submitValidateDiscountCode = () => {
    setDiscountCodeError("");
    if (inputRef.current) {
      const codeEntered = inputRef.current.value.trim();
      if (codeEntered.length > 0) {
        if (codesInUse.findIndex((code) => code.code === codeEntered) === -1) {
          setServerRequestInProgress(true);
          validateDiscountCode(codeEntered)
            .then((validation) => {
              setServerRequestInProgress(false);
              if (
                (codesInUse.length === 0 || validation.stackable) &&
                validation.valid
              ) {
                setCodesInUse((current) => [...current, validation]);
                if (inputRef.current) {
                  inputRef.current.value = "";
                }
              } else if (!validation.valid) {
                setDiscountCodeError("Code not usable");
              } else {
                setDiscountCodeError(
                  "Code cannot be used with other discounts"
                );
              }
            })
            .catch((err) => {
              setServerRequestInProgress(false);
              console.error(err);
              setDiscountCodeError("Discount code invalid");
            });
        }
      }
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <p>PayPal</p>

      {moreCodesAllowed && (
        <div className="flex flex-col">
          <form
            className="flex flex-col md:flex-row gap-2"
            onSubmit={(event) => event.preventDefault()}
          >
            <Input
              ref={inputRef}
              className="h-8 min-w-[120px] md:min-w-0"
              type="text"
              placeholder="Offer code"
              name="code"
            />
            <Button
              disabled={serverRequestInProgress}
              className="h-8"
              variant={"secondary"}
              onClick={() => submitValidateDiscountCode()}
            >
              Apply
            </Button>
          </form>
          {discountCodeError.length > 0 && (
            <small className={`text-destructive font-semibold`}>
              {discountCodeError}
            </small>
          )}
        </div>
      )}
      {codesInUse.map((code) => (
        <div key={code.code} className="flex flex-row text-secondary gap-2">
          <small>
            {code.code} ({code.percent}%)
          </small>
          <small
            className="font-bold hover:underline cursor-pointer"
            onClick={() =>
              setCodesInUse((prev) =>
                prev.filter((codeInList) => codeInList.code !== code.code)
              )
            }
          >
            REMOVE
          </small>
        </div>
      ))}
    </div>
  );
};

export default PaymentInfo;
