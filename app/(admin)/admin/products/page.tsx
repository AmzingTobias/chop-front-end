import { EAccountTypes, getAccountTypeFromCookie } from "@/app/data/auth";
import BaseProductsTable from "./BaseProductsTable";
import { cookies } from "next/headers";

const Page = () => {
  const authCookie = cookies().get("auth");
  const accountTypeLoggedIn = authCookie
    ? getAccountTypeFromCookie(authCookie.value)
    : undefined;

  if (accountTypeLoggedIn !== EAccountTypes.admin) {
    return null;
  }

  return (
    <main className="flex flex-col gap-8 p-2 w-full">
      <BaseProductsTable accountTypeLoggedIn={accountTypeLoggedIn} />
    </main>
  );
};

export default Page;
