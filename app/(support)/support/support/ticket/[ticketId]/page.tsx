import TicketDetails from "@/app/(customerFacing)/(shop)/support/ticket/[ticketId]/TicketDetails";
import SectionHeading from "@/app/components/SectionHeading";
import {
  getAccountTypeFromCookie,
  EAccountTypes,
  getSupportIdFromCookie,
} from "@/app/data/auth";
import { cookies } from "next/headers";
import ViewAssignedStaff from "@/app/(admin)/admin/support/ticket/[ticketId]/ViewAssignedStaff";
import Orders from "@/app/(admin)/admin/support/ticket/[ticketId]/Orders";

const Page = async ({ params }: { params: { ticketId: number } }) => {
  const authCookie = cookies().get("auth");
  const accountTypeLoggedIn = authCookie
    ? getAccountTypeFromCookie(authCookie.value)
    : undefined;
  const supportId = authCookie
    ? getSupportIdFromCookie(authCookie.value)
    : undefined;
  if (accountTypeLoggedIn !== EAccountTypes.support) {
    return null;
  }
  return (
    <main className="w-full h-screen max-h-screen flex flex-row p-4 gap-2">
      <div className="flex flex-col w-3/5 overflow-y-scroll p-2 gap-2">
        <SectionHeading text={`Ticket #${params.ticketId}`} />
        <ViewAssignedStaff
          ticketId={params.ticketId}
          supportIdLoggedIn={
            accountTypeLoggedIn === EAccountTypes.support
              ? supportId
              : undefined
          }
          accountTypeLoggedIn={accountTypeLoggedIn}
        />
        <TicketDetails
          ticketId={params.ticketId}
          loggedInAccountType={accountTypeLoggedIn}
        />
      </div>
      <div className="w-2/5 overflow-y-scroll p-2">
        <Orders
          ticketId={params.ticketId}
          accountTypeLoggedIn={accountTypeLoggedIn}
        />
      </div>
    </main>
  );
};

export default Page;
