"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AccountForm from "@/components/forms/AccountForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { z } from "zod";
import { authFormSchema } from "@/app/data/auth";

interface IStaffLoginFormProps {
  type: "sales" | "admin" | "support" | "warehouse";
}

const StaffLoginForm: React.FC<IStaffLoginFormProps> = ({ type }) => {
  const router = useRouter();
  const [loginRequestPending, setLoginRequestPending] = useState(false);
  const [internalError, setInternalError] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

  function onSubmit(values: z.infer<typeof authFormSchema>) {
    setLoginRequestPending(true);
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/auth/${type}/login`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      }
    )
      .then((response) => {
        setLoginRequestPending(false);
        if (response.ok) {
          router.refresh();
        } else if (response.status === 401) {
          // Credentials invalid
          setEmailErrorMsg("Email or password invalid");
          setPasswordErrorMsg("Email or password invalid");
        } else {
          // Server error
          console.error(response.status);
          setInternalError(true);
        }
      })
      .catch((err) => {
        setLoginRequestPending(false);
        console.error(err);
        setInternalError(true);
      });
  }

  return (
    <>
      <AccountForm
        onSubmit={onSubmit}
        formBtnText="Login"
        formSubmitted={loginRequestPending}
        emailErrorMsg={emailErrorMsg}
        passwordErrorMsg={passwordErrorMsg}
      />
      <AlertDialog open={internalError} onOpenChange={setInternalError}>
        <AlertDialogContent>
          <AlertDialogTitle>Internal error occured.</AlertDialogTitle>
          <AlertDialogAction className="bg-secondary">Ok</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default StaffLoginForm;
