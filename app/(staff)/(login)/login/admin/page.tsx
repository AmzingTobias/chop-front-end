import { EAccountTypes, getAccountTypeFromCookie } from "@/app/data/auth";
import AdminLogin from "./AdminLogin";
import Login from "./Login";
import { cookies } from "next/headers";
import { Suspense } from "react";

const Page = () => {
  const authCookie = cookies().get("auth");
  const accountTypeLoggedIn = authCookie
    ? getAccountTypeFromCookie(authCookie.value)
    : undefined;

  console.log(accountTypeLoggedIn);
  console.log(accountTypeLoggedIn === EAccountTypes.admin);

  return (
    <main className="flex flex-col items-center w-full ">
      <Login adminLoggedIn={accountTypeLoggedIn === EAccountTypes.admin} />
      <br className="my-4" />
      <Suspense>
        <AdminLogin />
      </Suspense>
    </main>
  );
};

export default Page;
