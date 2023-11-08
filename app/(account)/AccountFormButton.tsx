"use client";

import { Button } from "@material-tailwind/react";

const AccountFormButton = () => {
  return (
    <div className="flex w-full">
      <Button variant="gradient" color="blue" fullWidth type="submit">
        LOGIN
      </Button>
    </div>
  );
};

export default AccountFormButton;
