"use client";

import { TTicketInfoEntry } from "@/app/data/support";

interface ITicketTitleProps {
  ticketInfo: TTicketInfoEntry | null;
}
const TicketTitle: React.FC<ITicketTitleProps> = ({ ticketInfo }) => {
  if (ticketInfo === null) {
    return null;
  }

  return (
    <div className="w-full flex flex-col items-end">
      <div className="flex flex-row gap-2">
        {ticketInfo.closedOn !== null && (
          <h4>
            Ticket closed:{" "}
            <span className="font-semibold">
              {new Date(ticketInfo.closedOn).toLocaleDateString()}
            </span>
          </h4>
        )}
        {ticketInfo.lastUpdate !== null && ticketInfo.closedOn === null && (
          <h4>
            Ticket last updated:{" "}
            <span className="font-semibold">
              {new Date(ticketInfo.lastUpdate).toLocaleString()}
            </span>
          </h4>
        )}
        <h4>
          Ticket opened:{" "}
          <span className="font-semibold">
            {new Date(ticketInfo.createdOn).toLocaleDateString()}
          </span>
        </h4>
      </div>
      <div className="w-9/12 bg-primary rounded-md shadow-md p-2">
        <h2 className="text-xl">
          <span className="font-bold">{ticketInfo.title}</span>
        </h2>
        <div className="flex flex-col text-right "></div>
      </div>
    </div>
  );
};

export default TicketTitle;
