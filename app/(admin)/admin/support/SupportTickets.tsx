"use client";

import { ITicketInfoEntryStaff, getAllTickets } from "@/app/data/support";
import { useEffect, useState } from "react";
import SupportTicketTable from "./SupportTicketTable";
import { EAccountTypes } from "@/app/data/auth";

interface ISupportTicketsProps {
  accountTypeLoggedIn: EAccountTypes.admin | EAccountTypes.support;
}

const SupportTickets: React.FC<ISupportTicketsProps> = ({
  accountTypeLoggedIn,
}) => {
  const useAllTickets = () => {
    const [fetchedTickets, setFetchedTickets] = useState<
      ITicketInfoEntryStaff[]
    >([]);
    useEffect(() => {
      getAllTickets()
        .then((tickets) => setFetchedTickets(tickets))
        .catch((err) => {
          console.error(err);
          setFetchedTickets([]);
        });
    }, []);
    return fetchedTickets;
  };
  const fetchedTickets = useAllTickets();

  return (
    <div className="max-h-full h-full w-full">
      <SupportTicketTable
        tickets={fetchedTickets}
        accountTypeLoggedIn={accountTypeLoggedIn}
      />
    </div>
  );
};

export default SupportTickets;
