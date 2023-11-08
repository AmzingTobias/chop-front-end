"use client";

import { Input } from "@material-tailwind/react";
import React from "react";
import { BiUser, BiKey } from "react-icons/bi";

interface IAccountFormInput {
  inputType: "email" | "password";
  placeholder?: string;
  inputRef: React.Ref<HTMLInputElement>;
}

const AccountFormInput: React.FC<IAccountFormInput> = ({
  inputType,
  placeholder,
  inputRef,
}) => {
  return (
    <div className="flex w-[20rem]">
      <Input
        inputRef={inputRef}
        color="blue"
        variant="outlined"
        size="lg"
        required
        label={placeholder}
        type={inputType}
        crossOrigin={""}
        icon={inputType === "email" ? <BiUser /> : <BiKey />}
      ></Input>
    </div>
  );
};

export default AccountFormInput;
