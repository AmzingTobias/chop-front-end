import { Suspense } from "react";
import AccountFormSwitch from "../AccountSwitch";
import LoginForm from "./LoginForm";
import Login from "./Login";
import { getAccountTypeFromCookie } from "@/app/data/auth";
import { cookies } from "next/headers";

const LoginPage = () => {
  const authCookie = cookies().get("auth");
  const accountTypeLoggedIn = authCookie
    ? getAccountTypeFromCookie(authCookie.value)
    : undefined;

  return (
    <main className="flex flex-col items-center w-full">
      <Login accountLoggedIn={accountTypeLoggedIn !== undefined} />
      <br className="my-4" />
      <div className="flex max-w-[456px] w-full py-8 pb-16 rounded-md bg-accent shadow-md justify-center">
        <div className="flex flex-col w-9/12">
          <AccountFormSwitch
            active={0}
            tabs={[
              { display: "LOGIN", linkPath: "/login" },
              { display: "SIGNUP", linkPath: "/signup" },
            ]}
          />
          <br className="my-1.5" />
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
