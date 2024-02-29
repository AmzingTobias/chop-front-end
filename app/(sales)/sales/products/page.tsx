import { cookies } from "next/headers";
import BaseProductsTable from "../../../(admin)/admin/products/BaseProductsTable";
import { EAccountTypes, getAccountTypeFromCookie } from "@/app/data/auth";

const Page = () => {
  const authCookie = cookies().get("auth");
  const accountTypeLoggedIn = authCookie
    ? getAccountTypeFromCookie(authCookie.value)
    : undefined;

  if (accountTypeLoggedIn !== EAccountTypes.sales) {
    return null;
  }

  return (
    <main className="flex flex-col gap-8 p-2 w-full">
      <BaseProductsTable accountTypeLoggedIn={accountTypeLoggedIn} />
    </main>
  );
};

export default Page;
