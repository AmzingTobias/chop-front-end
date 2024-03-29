import { getAllPossibleOrderStatuses } from "@/app/data/orders";
import OrdersContent from "./OrdersContent";
import { getAccountTypeFromCookie, EAccountTypes } from "@/app/data/auth";
import { cookies } from "next/headers";

const Page = async () => {
  const allOrderStatusTypes = await getAllPossibleOrderStatuses();
  const authCookie = cookies().get("auth");
  const accountTypeLoggedIn = authCookie
    ? getAccountTypeFromCookie(authCookie.value)
    : undefined;

  if (accountTypeLoggedIn !== EAccountTypes.admin) {
    return null;
  }
  return (
    <main className="w-full h-screen max-h-screen overflow-clip flex p-2">
      <OrdersContent
        accountTypeLoggedIn={accountTypeLoggedIn}
        allOrderStatusTypes={allOrderStatusTypes}
      />
    </main>
  );
};

export default Page;
