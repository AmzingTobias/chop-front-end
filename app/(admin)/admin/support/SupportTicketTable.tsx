"use client";

import { EAccountTypes } from "@/app/data/auth";
import { ITicketInfoEntryStaff } from "@/app/data/support";
import StaffTable, { TTableRow } from "@/components/StaffTable";
import Link from "next/link";
import { useEffect, useState } from "react";
import SupportTicketsSearch from "./SupportTicketsSearch";

interface ISupportTicketTableProps {
  tickets: ITicketInfoEntryStaff[];
  accountTypeLoggedIn: EAccountTypes.admin | EAccountTypes.support;
}

const SupportTicketTable: React.FC<ISupportTicketTableProps> = ({
  tickets,
  accountTypeLoggedIn,
}) => {
  const [filteredTickets, setFilteredTickets] =
    useState<ITicketInfoEntryStaff[]>(tickets);
  useEffect(() => {
    setFilteredTickets(tickets);
  }, [tickets]);
  const [tableData, setTableData] = useState<TTableRow[]>([]);
  useEffect(() => {
    const tableRows: TTableRow[] = filteredTickets.map((ticket) => ({
      id: ticket.id,
      cells: [
        { display: ticket.id, sortValue: ticket.id },
        { display: ticket.title, sortValue: ticket.title },
        {
          display: new Date(ticket.createdOn).toLocaleDateString(),
          sortValue: ticket.createdOn,
        },
        {
          display:
            ticket.lastUpdate === null
              ? "No comments"
              : new Date(ticket.lastUpdate).toLocaleDateString(),
          sortValue: ticket.lastUpdate === null ? "0" : ticket.lastUpdate,
        },
        {
          display: ticket.closedOn === null ? "OPEN" : "CLOSED",
          sortValue: ticket.closedOn === null ? 1 : 0,
        },
        {
          display:
            ticket.assignedSupportId === null
              ? "Not assigned"
              : ticket.assignedSupportId,
          sortValue:
            ticket.assignedSupportId === null ? -1 : ticket.assignedSupportId,
        },
        {
          className: "last:text-right",
          display: (
            <Link
              href={`/${
                accountTypeLoggedIn === EAccountTypes.admin
                  ? "admin"
                  : "support"
              }/support/ticket/${ticket.id}`}
              className="bg-secondary p-2 rounded-md items-center hover:bg-secondary/80"
            >
              View ticket
            </Link>
          ),
          sortValue: undefined,
        },
      ],
    }));
    setTableData(tableRows);
  }, [filteredTickets, accountTypeLoggedIn]);

  return (
    <div className="max-h-full h-full">
      <SupportTicketsSearch
        fetchedTickets={tickets}
        setFilteredTickets={setFilteredTickets}
      />
      <div className="max-h-full h-full overflow-y-scroll">
        <StaffTable
          headings={[
            { display: "ID", sortable: true },
            { display: "Title", sortable: true },
            { display: "Created on", sortable: true },
            { display: "Last updated", sortable: true },
            { display: "Status", sortable: true },
            { display: "Assigned to", sortable: true },
            {
              display: "View",
              sortable: false,
              className: " justify-end",
            },
          ]}
          rows={tableData}
        />
      </div>
    </div>
  );
};

export default SupportTicketTable;
