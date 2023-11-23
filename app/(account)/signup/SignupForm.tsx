"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import AccountFormButton from "../AccountFormButton";
import AccountFormInput from "../AccountFormInput";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// TODO use zod for form

const validatePassword = (password: string): boolean => {
  // Password should be length of 7 or more
  // Password should contain a mix of numbers, and characters
  // Password should contain a mix of upper and lower case
  // Regex for that: ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{7,}$
  // ^ for the start of the string
  // (?=.*[a-z]) - Positive lookahead to check for at least one character
  // (?=.*[A-Z]) - Positive lookahead to check for at least one uppercase character
  // (?=.*\d) - Positive lookahead to check for at least one digit
  // .{7,} Match any character, except new line 7 times
  // $ Marks the end of the string
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{7,}$/;
  return passwordRegex.test(password);
};

const SignupForm = () => {
  const router = useRouter();
  const emailRef = useRef<null | HTMLInputElement>(null);
  const passwordRef = useRef<null | HTMLInputElement>(null);

  const [signupRequestPending, setSignupRequestPending] = useState(false);
  const [warningDialog, setWarningDialog] = useState({
    open: false,
    msg: "",
  });
  const [passwordValid, setPasswordValid] = useState(false);

  const submitSignupForm = (event: FormEvent<HTMLFormElement>) => {
    setSignupRequestPending(true);
    event.preventDefault();
    if (passwordRef.current !== null) {
      validatePassword(passwordRef.current.value);
    }
    if (emailRef.current !== null && passwordRef.current !== null) {
      if (validatePassword(passwordRef.current.value)) {
        fetch(
          `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/auth/customer/create`,
          {
            headers: {
              "Content-type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
              email: emailRef.current.value,
              password: passwordRef.current.value,
            }),
          }
        )
          .then((response) => {
            setSignupRequestPending(false);
            if (response.ok) {
              // User has signed up succesfully
              setWarningDialog((prev) => ({ ...prev, open: false }));
              router.push("/login?account-created=true");
            } else if (response.status === 409) {
              // Credentials invalid
              setWarningDialog({ msg: "Email already in use.", open: true });
            } else {
              // Server error
              setWarningDialog({ msg: "Internal error.", open: true });
            }
          })
          .catch((err) => {
            setSignupRequestPending(false);
            console.error(err);
            // Do the same as if there was a server error
            setWarningDialog({ msg: "Internal error.", open: true });
          });
      } else {
        setSignupRequestPending(false);
        setWarningDialog({ msg: "Password too weak.", open: true });
      }
    }
  };

  useEffect(() => {
    if (passwordRef.current !== null) {
      if (passwordValid) {
        passwordRef.current.classList.remove("bg-destructive");
      } else {
        passwordRef.current.classList.add("bg-destructive");
      }
    }
  }, [passwordValid]);

  return (
    <form
      className="flex flex-col gap-4 mt-6"
      action=""
      method="post"
      onSubmit={(event) => submitSignupForm(event)}
    >
      <AccountFormInput
        inputType="email"
        placeholder="Email"
        inputRef={emailRef}
      />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <AccountFormInput
              inputType="password"
              placeholder="Password"
              onChange={(event) =>
                setPasswordValid(validatePassword(event.target.value))
              }
              inputRef={passwordRef}
            />
          </TooltipTrigger>
          <TooltipContent>
            <ul className="max-w-xs px-4 list-disc">
              <li>
                <p>Passwords should be at least 7 characters</p>
              </li>
              <li>
                <p>Passwords should contain a mix of numbers and characters</p>
              </li>
              <li>
                <p>
                  Passwords should contain a mix of upper and lower case
                  characters
                </p>
              </li>
            </ul>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {warningDialog.open ? (
        <Alert className="w-full text-white border-none bg-destructive">
          <AlertDescription>{warningDialog.msg}</AlertDescription>
        </Alert>
      ) : (
        <></>
      )}
      <AccountFormButton display="SIGNUP" disabled={signupRequestPending} />
    </form>
  );
};

export default SignupForm;
