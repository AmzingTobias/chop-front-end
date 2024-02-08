"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AccountForm from "../../../../components/forms/AccountForm";
import { z } from "zod";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { authFormSchema } from "@/app/data/auth";

const SignupForm = () => {
  const router = useRouter();

  const [signupRequestPending, setSignupRequestPending] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [internalError, setInternalError] = useState(false);

  function onSubmit(values: z.infer<typeof authFormSchema>) {
    setSignupRequestPending(true);
    setEmailErrorMsg("");
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/auth/customer/create`,
      {
        headers: {
          "Content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      }
    )
      .then((response) => {
        setSignupRequestPending(false);
        if (response.ok) {
          router.push("/login?account-created=true");
        } else if (response.status === 409) {
          setEmailErrorMsg("Email already in use");
        } else {
          console.error(`Internal error: ${response.status}`);
          setInternalError(true);
        }
      })
      .catch((err) => {
        setSignupRequestPending(false);
        console.error(err);
      });
  }

  return (
    <>
      <AccountForm
        onSubmit={onSubmit}
        formBtnText="Signup"
        formSubmitted={signupRequestPending}
        emailErrorMsg={emailErrorMsg}
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

export default SignupForm;
