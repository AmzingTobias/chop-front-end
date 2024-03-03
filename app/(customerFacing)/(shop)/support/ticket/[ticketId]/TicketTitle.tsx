"use client";

import SectionHeading from "@/app/components/SectionHeading";
import { TTicketInfoEntry, getTicketWithId } from "@/app/data/support";
import { useEffect, useState } from "react";

interface ITicketTitleProps {
  ticketId: number;
}
const TicketTitle: React.FC<ITicketTitleProps> = ({ ticketId }) => {
  const useTicketInfo = () => {
    const [ticketInfo, setTicketInfo] = useState<TTicketInfoEntry | null>(null);
    useEffect(() => {
      getTicketWithId(ticketId)
        .then((ticket) => setTicketInfo(ticket))
        .catch((err) => {
          console.error(err);
          setTicketInfo(null);
        });
    }, []);
    return ticketInfo;
  };
  const ticketInfo = useTicketInfo();

  if (ticketInfo === null) {
    return null;
  }

  return (
    <div className="w-full flex flex-col items-end">
      <div className="flex flex-row gap-2">
        {ticketInfo.lastUpdate !== null && (
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
