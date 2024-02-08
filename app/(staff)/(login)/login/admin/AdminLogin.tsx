import StaffLoginForm from "@/app//(staff)/(login)/login/StaffLoginForm";
import AccountFormSwitch from "@/app/(customerFacing)/(account)/AccountSwitch";

const AdminLogin = () => {
  return (
    <div className="flex max-w-[856px] w-full py-8 pb-16 rounded-md bg-accent shadow-md justify-center">
      <div className="flex flex-col">
        <AccountFormSwitch
          active={0}
          tabs={[
            { display: "ADMIN", linkPath: "/login/admin" },
            { display: "SALES", linkPath: "/login/sales" },
            { display: "SUPPORT", linkPath: "/login/support" },
            { display: "WAREHOUSE", linkPath: "/login/warehouse" },
          ]}
        />
        <br className="my-1.5" />
        <StaffLoginForm type="admin" />
      </div>
    </div>
  );
};

export default AdminLogin;
