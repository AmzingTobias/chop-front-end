import AccountFormSwitch from "../AccountSwitch";
import SignupForm from "./SignupForm";

const LoginBox = () => {
  return (
    <main className="flex flex-col items-center w-full">
      <br className="my-4" />
      <div className="flex max-w-[456px] w-full py-8 pb-16 rounded-md bg-accent shadow-md justify-center">
        <div className="flex flex-col w-9/12">
          <AccountFormSwitch
            active={1}
            tabs={[
              { display: "LOGIN", linkPath: "/login" },
              { display: "SIGNUP", linkPath: "/signup" },
            ]}
          />
          <br className="my-1.5" />
          <SignupForm />
        </div>
      </div>
    </main>
  );
};

export default LoginBox;
