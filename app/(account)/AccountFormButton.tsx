"use client";

import { Button } from "@/components/ui/button";

interface IAccountFormButton {
  display: string;
  disabled?: boolean;
}

const AccountFormButton: React.FC<IAccountFormButton> = ({
  display,
  disabled = false,
}) => {
  return (
    <div className="flex w-full">
      <Button
        variant={"secondary"}
        color="blue"
        type="submit"
        disabled={disabled}
        className="w-full"
      >
        {display}
      </Button>
    </div>
  );
};

export default AccountFormButton;
