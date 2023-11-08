import AccountFormSwitch from "../AccountSwitch";

const LoginBox = () => {
  return (
    <div className="w-[28rem] h-[36rem] border-black/10 border-0 rounded-xl bg-white shadow-lg">
      <div className="flex flex-col w-full justify-center items-center">
        <AccountFormSwitch
          active={0}
          tabs={[
            { display: "LOGIN", linkPath: "/login" },
            { display: "SIGNUP", linkPath: "/signup" },
          ]}
        />
      </div>
    </div>
  );
};

export default LoginBox;
