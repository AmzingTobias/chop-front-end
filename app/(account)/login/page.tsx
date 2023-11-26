import { Suspense } from "react";
import AccountFormSwitch from "../AccountSwitch";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <main className="flex flex-col items-center w-full">
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
