"use client";

import { useEffect, useState } from "react";
import { TTicketInfoEntry, getAllTicketsForCustomer } from "@/app/data/support";
import TicketsList from "./TicketsList";
import TicketsStatus from "./TicketsStatus";

interface ITicketDisplayProps {
  accountId: number;
}

const TicketsDisplay: React.FC<ITicketDisplayProps> = ({ accountId }) => {
  const useTickets = () => {
    const [tickets, setTickets] = useState<TTicketInfoEntry[]>([]);
    useEffect(() => {
      getAllTicketsForCustomer()
        .then((ticketsFetched) => setTickets(ticketsFetched))
        .catch((err) => {
          console.error(err);
          setTickets([]);
        });
    }, []);
    return tickets;
  };

  const tickets = useTickets();
  const ticketsAwaitingReply = tickets.filter(
    (ticket) =>
      ticket.closedOn === null &&
      (ticket.mostRecentAuthorId === accountId ||
        ticket.mostRecentAuthorId === null)
  );
  const ticketsAwaitingCustomerReply = tickets.filter(
    (ticket) =>
      ticket.closedOn === null &&
      ticket.mostRecentAuthorId !== accountId &&
      ticket.mostRecentAuthorId !== null
  );
  const ticketsClosed = tickets
    .filter((ticket) => ticket.closedOn !== null)
    .sort(
      (a, b) =>
        (new Date(b.closedOn as any) as any) -
        (new Date(a.closedOn as any) as any)
    );

  return (
    <div className="w-full flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-2/3 flex flex-col gap-8">
        {ticketsAwaitingCustomerReply.length > 0 && (
          <TicketsList
            sectionHeadingText="Awaiting your reply"
            ticketsToDisplay={ticketsAwaitingCustomerReply}
          />
        )}
        {ticketsAwaitingReply.length > 0 && (
          <TicketsList
            sectionHeadingText="Open tickets"
            ticketsToDisplay={ticketsAwaitingReply}
          />
        )}
        {ticketsClosed.length > 0 && (
          <TicketsList
            sectionHeadingText="Closed tickets"
            ticketsToDisplay={ticketsClosed}
          />
        )}
      </div>
      <div className="w-full md:w-1/3">
        <TicketsStatus
          numberOfTicketsAwaitingCustomerReply={
            ticketsAwaitingCustomerReply.length
          }
          numberOfTicketsAwaitingResponse={ticketsAwaitingReply.length}
        />
      </div>
    </div>
  );
};

export default TicketsDisplay;
