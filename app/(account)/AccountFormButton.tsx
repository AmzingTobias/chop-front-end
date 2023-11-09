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
        color="blue"
        type="submit"
        disabled={disabled}
        className="w-full bg-blue-800 hover:bg-blue-900"
      >
        {display}
      </Button>
    </div>
  );
};

export default AccountFormButton;
