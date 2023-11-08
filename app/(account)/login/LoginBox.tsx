import AccountFormSwitch from "../AccountSwitch";
import LoginForm from "./LoginForm";

const LoginBox = () => {
  return (
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
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginBox;
