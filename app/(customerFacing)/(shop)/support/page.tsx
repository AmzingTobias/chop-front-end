import { getAccountIdFromCookie } from "@/app/data/auth";
import { cookies } from "next/headers";
import TicketsDisplay from "./TicketsDisplay";

const Page = () => {
  const authCookie = cookies().get("auth");
  const accountId = authCookie
    ? getAccountIdFromCookie(authCookie.value)
    : undefined;

  if (accountId === undefined) {
    return null;
  }

  return (
    <main className="flex flex-col gap-4 w-full p-1">
      <TicketsDisplay accountId={accountId} />
    </main>
  );
};

export default Page;
