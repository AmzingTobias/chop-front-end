"use client";

import { Button } from "@material-tailwind/react";

interface IAccountFormButton {
  display: string;
}

const AccountFormButton: React.FC<IAccountFormButton> = ({ display }) => {
  return (
    <div className="flex w-full">
      <Button variant="gradient" color="blue" fullWidth type="submit">
        {display}
      </Button>
    </div>
  );
};

export default AccountFormButton;
