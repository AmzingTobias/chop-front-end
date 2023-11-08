"use client";

import { Button } from "@/components/ui/button";

interface IAccountFormButton {
  display: string;
}

const AccountFormButton: React.FC<IAccountFormButton> = ({ display }) => {
  return (
    <div className="flex w-full">
      <Button
        color="blue"
        type="submit"
        className="w-full bg-blue-800 hover:bg-blue-900"
      >
        {display}
      </Button>
    </div>
  );
};

export default AccountFormButton;
