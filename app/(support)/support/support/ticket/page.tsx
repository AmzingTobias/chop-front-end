import { getAccountTypeFromCookie, EAccountTypes } from "@/app/data/auth";
import { cookies } from "next/headers";
import SupportTickets from "@/app/(admin)/admin/support/SupportTickets";

const Page = () => {
  const authCookie = cookies().get("auth");
  const accountTypeLoggedIn = authCookie
    ? getAccountTypeFromCookie(authCookie.value)
    : undefined;

  if (accountTypeLoggedIn !== EAccountTypes.support) {
    return null;
  }
  return (
    <main className="w-full h-screen max-h-screen flex p-4 overflow-clip">
      <SupportTickets accountTypeLoggedIn={accountTypeLoggedIn} />
    </main>
  );
};

export default Page;
