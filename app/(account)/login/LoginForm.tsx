"use client";

import { FormEvent, useRef, useState } from "react";
import AccountFormButton from "../AccountFormButton";
import AccountFormInput from "../AccountFormInput";
// import { Alert, Spinner } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const LoginForm = () => {
  const router = useRouter();
  const emailRef = useRef<null | HTMLInputElement>(null);
  const passwordRef = useRef<null | HTMLInputElement>(null);

  const [loginRequestLoading, setLoginRequestLoading] = useState(false);
  const [warningText, setWarningText] = useState("");
  const [openWarning, setOpenWarning] = useState(false);
  const [_, setCookie] = useCookies(["auth"]);

  const submitLoginForm = (event: FormEvent<HTMLFormElement>) => {
    setLoginRequestLoading(true);
    event.preventDefault();
    if (emailRef.current !== null && passwordRef.current !== null) {
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/auth/customer/login`,
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
          setLoginRequestLoading(false);
          if (response.ok) {
            // User has logged in succesfully
            response
              .json()
              .then((jsonResponse) => {
                const expireDate = new Date(
                  new Date().setDate(new Date().getDate() + 7)
                );
                setCookie("auth", jsonResponse["token"], {
                  secure: true,
                  expires: expireDate,
                  sameSite: "lax",
                });
                setOpenWarning(false);
                router.push("/");
              })
              .catch((err) => {
                console.error(err);
                setWarningText("Internal error.");
                setOpenWarning(true);
              });
          } else if (response.status === 401) {
            // Credentials invalid
            setWarningText("Email or password invalid.");
            setOpenWarning(true);
          } else {
            // Server error
            setWarningText("Internal error.");
            setOpenWarning(true);
          }
        })
        .catch((err) => {
          setLoginRequestLoading(false);
          console.error(err);
          // Do the same as if there was a server error
          setWarningText("Internal error.");
          setOpenWarning(true);
        });
    }
  };

  return (
    <form
      className="flex flex-col gap-4 mt-6"
      action=""
      method="post"
      onSubmit={(event) => submitLoginForm(event)}
    >
      <AccountFormInput
        inputType="email"
        placeholder="Email"
        inputRef={emailRef}
      />
      <AccountFormInput
        inputType="password"
        placeholder="Password"
        inputRef={passwordRef}
      />
      {openWarning ? (
        <Alert className="w-full bg-red-600 text-white">
          <AlertDescription>{warningText}</AlertDescription>
        </Alert>
      ) : (
        <></>
      )}
      <AccountFormButton display="LOGIN" />
      {/* {loginRequestLoading ? <Spinner className="w-full h-8" /> : <></>} */}
    </form>
  );
};

export default LoginForm;
