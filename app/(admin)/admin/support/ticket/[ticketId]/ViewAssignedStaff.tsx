"use client";

import {
  TSupportAccount,
  getAssignedSupportStaffForTicket,
} from "@/app/data/support";
import { useEffect, useState } from "react";
import AssignedSupportStaff from "./AssignedSupportStaff";
import AssignSupportStaff from "./AssignSupportStaff";

interface IViewAssignedStaffProps {
  ticketId: number;
}
const ViewAssignedStaff: React.FC<IViewAssignedStaffProps> = ({ ticketId }) => {
  const useAssignedStaff = () => {
    const [assignedStaffId, setAssignedStaffId] =
      useState<TSupportAccount | null>(null);
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

  return (
    <div className="w-full flex justify-end">
      <div className="rounded-md shadow-md p-2 items-center">
        {assignedStaffId === null ? (
          <AssignSupportStaff
            ticketId={ticketId}
            refreshAssignedAccount={fetchAssignedStaffId}
          />
        ) : (
          <AssignedSupportStaff
            assignedSupportStaff={assignedStaffId}
            ticketId={ticketId}
            refreshAssignedSupportStaff={fetchAssignedStaffId}
          />
        )}
      </div>
    </div>
  );
};

export default ViewAssignedStaff;
