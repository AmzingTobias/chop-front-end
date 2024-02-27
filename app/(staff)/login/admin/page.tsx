import { EAccountTypes, getAccountTypeFromCookie } from "@/app/data/auth";
import Login from "./Login";
import { cookies } from "next/headers";
import { Suspense } from "react";
import AccountFormSwitch from "@/app/(customerFacing)/(account)/AccountSwitch";
import StaffLoginForm from "../StaffLoginForm";
import { redirect } from "next/navigation";

const Page = () => {
  const authCookie = cookies().get("auth");
  const accountTypeLoggedIn = authCookie
    ? getAccountTypeFromCookie(authCookie.value)
    : undefined;

  if (accountTypeLoggedIn === EAccountTypes.admin) {
    redirect("/admin");
    return null;
    // return <Login adminLoggedIn={accountTypeLoggedIn !== undefined} />;
  }

  return (
    <main className="flex flex-col items-center w-full">
      <br className="my-4" />
      <div className="flex max-w-[856px] w-full py-8 pb-16 rounded-md bg-accent shadow-md justify-center">
        <div className="flex flex-col w-9/12">
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
          <Suspense>
            <StaffLoginForm type="admin" />
          </Suspense>
        </div>
      </div>
    </main>
  );
};

export default Page;
