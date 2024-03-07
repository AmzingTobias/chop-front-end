import {
  getAccountIdFromCookie,
  getAccountTypeFromCookie,
} from "@/app/data/auth";
import { cookies } from "next/headers";
import TicketDetails from "./TicketDetails";
import SectionHeading from "@/app/components/SectionHeading";

export default async function Page({
  params,
}: {
  params: { ticketId: number };
}) {
  const authCookie = cookies().get("auth");
  const accountType = authCookie
    ? getAccountTypeFromCookie(authCookie.value)
    : undefined;

  if (accountType === undefined) {
    return null;
  }
  return (
    <main className="w-full flex flex-col gap-4">
      <SectionHeading text={`Ticket #${params.ticketId}`} />
      <div className="flex flex-col gap-4">
        <TicketDetails
          ticketId={params.ticketId}
          loggedInAccountType={accountType}
        />
      </div>
    </main>
  );
}
