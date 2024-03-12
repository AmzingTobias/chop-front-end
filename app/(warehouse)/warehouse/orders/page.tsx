import { getAllPossibleOrderStatuses } from "@/app/data/orders";
import OrdersContent from "@/app/(admin)/admin/orders/OrdersContent";
import { cookies } from "next/headers";
import { EAccountTypes, getAccountTypeFromCookie } from "@/app/data/auth";

const Page = async () => {
  const allOrderStatusTypes = await getAllPossibleOrderStatuses();
  const authCookie = cookies().get("auth");
  const accountTypeLoggedIn = authCookie
    ? getAccountTypeFromCookie(authCookie.value)
    : undefined;

  if (accountTypeLoggedIn !== EAccountTypes.warehouse) {
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
