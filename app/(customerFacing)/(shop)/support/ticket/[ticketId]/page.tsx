import { getAccountIdFromCookie } from "@/app/data/auth";
import { cookies } from "next/headers";
import TicketComments from "./TicketComments";
import TicketTitle from "./TicketTitle";
import SectionHeading from "@/app/components/SectionHeading";

export default async function Page({
  params,
}: {
  params: { ticketId: number };
}) {
  const authCookie = cookies().get("auth");
  const accountId = authCookie
    ? getAccountIdFromCookie(authCookie.value)
    : undefined;

  if (accountId === undefined) {
    return null;
  }
  return (
    <div className="w-full flex flex-col gap-4">
      <SectionHeading text={`Ticket #${params.ticketId}`} />
      <div className="flex flex-col gap-4">
        <TicketTitle ticketId={params.ticketId} />
        <TicketComments
          ticketId={params.ticketId}
          loggedInAccountId={accountId}
        />
      </div>
    </div>
  );
}
