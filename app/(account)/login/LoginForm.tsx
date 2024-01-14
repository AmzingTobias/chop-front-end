"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AccountForm from "../AccountForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { z } from "zod";
import { authFormSchema } from "@/app/data/auth";
import { addNewProductToBasket, getBasketContents } from "@/app/data/basket";
import { useDispatch, useSelector } from "react-redux";
import { applyBasketToCart } from "@/app/redux/slices/basket.slice";

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [redirectFromAccountCreated, setRedirectedFromAccountCreated] =
    useState(searchParams.get("account-created") === "true");
  const [loginRequestPending, setLoginRequestPending] = useState(false);
  const [internalError, setInternalError] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

  const { loading, basketItems } = useSelector(
    (state: {
      basket: {
        loading: boolean;
        basketItems: {
          productId: number;
          quantity: number;
        }[];
      };
    }) => state.basket
  );
  const dispatch = useDispatch();

  function onSubmit(values: z.infer<typeof authFormSchema>) {
    setLoginRequestPending(true);
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/auth/customer/login`,
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
          // User has logged in succesfully
          response
            .json()
            .then((jsonResponse) => {
              if (!loading) {
                getBasketContents().then(async (basket) => {
                  if (basket.length === 0) {
                    await Promise.all(
                      basketItems.map((item) => {
                        addNewProductToBasket(item.productId, item.quantity);
                      })
                    );
                  } else {
                    getBasketContents().then((basketToApply) => {
                      dispatch(applyBasketToCart({ basket: basketToApply }));
                    });
                  }
                  router.refresh();
                });
              }
            })
            .catch((err) => {
              console.error(err);
              setInternalError(true);
            });
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
      <AlertDialog
        open={redirectFromAccountCreated}
        onOpenChange={setRedirectedFromAccountCreated}
      >
        <AlertDialogContent>
          <AlertDialogTitle>Account created.</AlertDialogTitle>
          <AlertDialogAction className="bg-secondary">Ok</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={internalError} onOpenChange={setInternalError}>
        <AlertDialogContent>
          <AlertDialogTitle>Internal error occured.</AlertDialogTitle>
          <AlertDialogAction className="bg-secondary">Ok</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default LoginForm;
