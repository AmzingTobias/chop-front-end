"use client";

// import { Input } from "@material-tailwind/react";
import { Input } from "@/components/ui/input";
import React from "react";

interface IAccountFormInput {
  inputType: "email" | "password";
  placeholder?: string;
  inputRef: React.Ref<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const AccountFormInput: React.FC<IAccountFormInput> = ({
  inputType,
  placeholder,
  inputRef,
  onChange,
}) => {
  return (
    <div className="flex w-[20rem]">
      <Input
        ref={inputRef}
        color="blue"
        required
        type={inputType}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default AccountFormInput;
