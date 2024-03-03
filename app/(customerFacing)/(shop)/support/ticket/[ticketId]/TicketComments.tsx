"use client";

import { TTicketComment, getCommentsForTicket } from "@/app/data/support";
import Comment from "./Comment";
import { useEffect, useState } from "react";

interface ITicketCommentsProps {
  ticketId: number;
  loggedInAccountId: number;
}

const TicketComments: React.FC<ITicketCommentsProps> = ({
  ticketId,
  loggedInAccountId,
}) => {
  const useTicketComments = () => {
    const [comments, setComments] = useState<TTicketComment[]>([]);
    useEffect(() => {
      getCommentsForTicket(ticketId)
        .then((fetchedComments) => setComments(fetchedComments.reverse()))
        .catch((err) => {
          console.error(err);
          setComments([]);
        });
    }, []);
    return comments;
  };

  const ticketComments = useTicketComments();

  return (
    <div className="flex flex-col gap-4 w-full">
      {ticketComments.map((comments) => (
        <Comment loggedInAccountId={loggedInAccountId} {...comments} />
      ))}
    </div>
  );
};

export default TicketComments;
