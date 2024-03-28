"use client";

import {
  TSupportAccount,
  getAssignedSupportStaffForTicket,
} from "@/app/data/support";
import { useEffect, useState } from "react";
import AssignedSupportStaff from "./AssignedSupportStaff";
import AssignSupportStaff from "./AssignSupportStaff";
import { EAccountTypes } from "@/app/data/auth";
import ClaimTicket from "./ClaimTicket";
import TicketLogs from "./TicketLogs";

interface IViewAssignedStaffProps {
  ticketId: number;
  accountTypeLoggedIn: EAccountTypes.admin | EAccountTypes.support;
  supportIdLoggedIn?: number;
}
const ViewAssignedStaff: React.FC<IViewAssignedStaffProps> = ({
  ticketId,
  accountTypeLoggedIn,
  supportIdLoggedIn = -1,
}) => {
  const useAssignedStaff = () => {
    const [assignedStaffId, setAssignedStaffId] = useState<
      TSupportAccount | null | undefined
    >();
    const fetchAssignedStaffId = () => {
      getAssignedSupportStaffForTicket(ticketId)
        .then((supportId) => setAssignedStaffId(supportId))
        .catch((err) => {
          console.error(err);
          setAssignedStaffId(null);
        });
    };
    useEffect(() => {
      fetchAssignedStaffId();
    }, []);
    return { assignedStaffId, fetchAssignedStaffId };
  };
  const { assignedStaffId, fetchAssignedStaffId } = useAssignedStaff();

  if (assignedStaffId === undefined) {
    return null;
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="p-2 items-center">
        {accountTypeLoggedIn === EAccountTypes.admin ? (
          assignedStaffId === null ? (
            <AssignSupportStaff
              ticketId={ticketId}
              refreshAssignedAccount={fetchAssignedStaffId}
            />
          ) : (
            <AssignedSupportStaff
              assignedSupportStaff={assignedStaffId}
              ticketId={ticketId}
              refreshAssignedSupportStaff={fetchAssignedStaffId}
              btnText="Unassign support staff"
            />
          )
        ) : assignedStaffId === null ? (
          supportIdLoggedIn !== -1 && (
            <ClaimTicket
              ticketId={ticketId}
              refreshAssignedAccount={fetchAssignedStaffId}
            />
          )
        ) : (
          assignedStaffId.supportId === supportIdLoggedIn && (
            <AssignedSupportStaff
              assignedSupportStaff={assignedStaffId}
              ticketId={ticketId}
              refreshAssignedSupportStaff={fetchAssignedStaffId}
              btnText="Unassign self"
            />
          )
        )}
      </div>
      <TicketLogs ticketId={ticketId} />
    </div>
  );
};

export default ViewAssignedStaff;
