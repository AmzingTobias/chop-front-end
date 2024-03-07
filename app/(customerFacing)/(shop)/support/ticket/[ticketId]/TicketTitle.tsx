"use client";

import { EAccountTypes } from "@/app/data/auth";
import { ITicketInfoEntry } from "@/app/data/support";

interface ITicketTitleProps {
  ticketInfo: ITicketInfoEntry | null;
  loggedInAccountType: EAccountTypes;
}
const TicketTitle: React.FC<ITicketTitleProps> = ({
  ticketInfo,
  loggedInAccountType,
}) => {
  if (ticketInfo === null) {
    return null;
  }

  return (
    <div
      className={`w-full flex flex-col ${
        loggedInAccountType === EAccountTypes.customer
          ? "items-end"
          : "items-start"
      }`}
    >
      <div className="flex flex-row gap-2">
        {ticketInfo.closedOn !== null && (
          <h4>
            Ticket closed:{" "}
            <span className="font-semibold">
              {new Date(ticketInfo.closedOn).toLocaleString()}
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
      <div
        className={`w-9/12 ${
          loggedInAccountType === EAccountTypes.customer
            ? "bg-primary text-accent"
            : "bg-accent text-accent-foreground"
        } rounded-md shadow-md p-2`}
      >
        <h2 className="text-xl">
          Ticket title: <span className="font-bold">{ticketInfo.title}</span>
        </h2>
        <div className="flex flex-col text-right "></div>
      </div>
    </div>
  );
};

export default TicketTitle;
