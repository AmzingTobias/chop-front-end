import TicketDetails from "@/app/(customerFacing)/(shop)/support/ticket/[ticketId]/TicketDetails";
import SectionHeading from "@/app/components/SectionHeading";
import { getAccountTypeFromCookie, EAccountTypes } from "@/app/data/auth";
import { cookies } from "next/headers";
import ViewAssignedStaff from "./ViewAssignedStaff";

const Page = async ({ params }: { params: { ticketId: number } }) => {
  const authCookie = cookies().get("auth");
  const accountTypeLoggedIn = authCookie
    ? getAccountTypeFromCookie(authCookie.value)
    : undefined;

  if (accountTypeLoggedIn !== EAccountTypes.admin) {
    return null;
  }
  return (
    <main className="w-full h-screen max-h-screen overflow-y-scroll flex flex-col p-6">
      <SectionHeading text={`Ticket #${params.ticketId}`} />
      <ViewAssignedStaff ticketId={params.ticketId} />
      <TicketDetails
        ticketId={params.ticketId}
        loggedInAccountType={accountTypeLoggedIn}
      />
    </main>
  );
};

export default Page;
