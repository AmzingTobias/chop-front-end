"use client";

// import { Input } from "@material-tailwind/react";
import { Input } from "@/components/ui/input";
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
        ref={inputRef}
        color="blue"
        required
        type={inputType}
        placeholder={placeholder}
      />
    </div>
  );
};

export default AccountFormInput;
