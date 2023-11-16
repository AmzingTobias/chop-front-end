import { Suspense } from "react";
import AccountFormSwitch from "../AccountSwitch";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <main className="flex flex-col w-full items-center">
      <br className="my-4" />
      <div className="max-w-[32rem] w-full h-[26rem]  rounded-xl bg-white shadow-lg">
        <div className="flex items-center align-middle mt-8">
          <div className="flex flex-col w-full justify-center items-center">
            <AccountFormSwitch
              active={0}
              tabs={[
                { display: "LOGIN", linkPath: "/login" },
                { display: "SIGNUP", linkPath: "/signup" },
              ]}
            />
            <Suspense>
              <LoginForm />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
