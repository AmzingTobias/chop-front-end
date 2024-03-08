"use client";

import {
  TTicketComment,
  ITicketInfoEntry,
  getCommentsForTicket,
  getTicketWithId,
  setTicketAsClosed,
} from "@/app/data/support";
import Comment from "./Comment";
import { useEffect, useState } from "react";
import AddComment from "./AddComment";
import CloseTicket from "./CloseTicket";
import TicketTitle from "./TicketTitle";
import TicketClosed from "./TickedClosed";
import { EAccountTypes } from "@/app/data/auth";

interface ITicketDetailsProps {
  ticketId: number;
  loggedInAccountType: EAccountTypes;
}

const TicketDetails: React.FC<ITicketDetailsProps> = ({
  ticketId,
  loggedInAccountType,
}) => {
  const useTicketComments = () => {
    const [comments, setComments] = useState<TTicketComment[]>([]);
    const fetchComments = () => {
      getCommentsForTicket(ticketId)
        .then((fetchedComments) => setComments(fetchedComments.reverse()))
        .catch((err) => {
          console.error(err);
          setComments([]);
        });
    };
    useEffect(() => {
      fetchComments();
    }, []);
    return { comments, fetchComments };
  };

  const useTicketInfo = () => {
    const [ticketInfo, setTicketInfo] = useState<ITicketInfoEntry | null>(null);
    const refreshTicketInfo = () => {
      getTicketWithId(ticketId)
        .then((ticket) => setTicketInfo(ticket))
        .catch((err) => {
          console.error(err);
          setTicketInfo(null);
        });
    };
    useEffect(() => {
      refreshTicketInfo();
    }, []);
    return { ticketInfo, refreshTicketInfo };
  };
  const { ticketInfo, refreshTicketInfo } = useTicketInfo();

  const { comments: ticketComments, fetchComments: refreshComments } =
    useTicketComments();

  if (ticketInfo === null) {
    return null;
  }

  const updateTicketAsClosed = () => {
    setTicketAsClosed(ticketId)
      .then(() => {
        refreshTicketInfo();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <TicketTitle
        ticketInfo={ticketInfo}
        loggedInAccountType={loggedInAccountType}
      />
      {ticketComments.map((comments) => (
        <Comment
          key={comments.id}
          loggedInAccountType={loggedInAccountType}
          {...comments}
        />
      ))}
      <hr className="border-[1px] bg-accent border-accent" />
      {ticketInfo.closedOn !== null ? (
        <TicketClosed />
      ) : (
        <div className="flex flex-col md:items-end gap-4">
          <AddComment
            refreshComments={refreshComments}
            ticketId={ticketId}
            className="w-full md:w-9/12"
          />
          {loggedInAccountType === EAccountTypes.customer ||
            (loggedInAccountType === EAccountTypes.admin && (
              <CloseTicket
                setTicketClosed={updateTicketAsClosed}
                className="w-full md:w-9/12"
                loggedInAccountType={loggedInAccountType}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default TicketDetails;
