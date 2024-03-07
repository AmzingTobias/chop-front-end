"use client";

import { assignSupportStaffToTicket } from "@/app/data/support";
import { Button } from "@/components/ui/button";

interface IClaimTicketProps {
  ticketId: number;
  refreshAssignedAccount: () => void;
}
const ClaimTicket: React.FC<IClaimTicketProps> = ({
  ticketId,
  refreshAssignedAccount,
}) => {
  return (
    <Button
      className="w-[200px]"
      variant={"secondary"}
      onClick={() => {
        assignSupportStaffToTicket(ticketId)
          .then(() => {
            refreshAssignedAccount();
          })
          .catch((err) => {
            console.error(err);
          });
      }}
    >
      Claim ticket
    </Button>
  );
};

export default ClaimTicket;
