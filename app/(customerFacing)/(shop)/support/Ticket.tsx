import { TTicketInfoEntry } from "@/app/data/support";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ITicketProps extends TTicketInfoEntry {}

const Ticket: React.FC<ITicketProps> = (props) => {
  return (
    <div className="bg-primary text-accent rounded-md w-full flex flex-row p-2 shadow-md gap-2">
      <div className="w-full">
        <h2 className="font-semibold text-xl">{props.title}</h2>
        {props.firstComment !== null && (
          <p className="text-sm line-clamp-3">{props.firstComment}</p>
        )}
      </div>
      <div className="flex flex-col w-fit whitespace-nowrap">
        {props.closedOn !== null && (
          <h4>
            Closed on:{" "}
            <span className="font-semibold">
              {new Date(props.closedOn).toLocaleDateString()}
            </span>
          </h4>
        )}
        {props.closedOn === null && props.lastUpdate !== null && (
          <h4>
            Last updated:{" "}
            <span className="font-semibold">
              {new Date(props.lastUpdate).toLocaleDateString()}
            </span>
          </h4>
        )}
        <h4>
          Date created:{" "}
          <span className="font-semibold">
            {new Date(props.createdOn).toLocaleDateString()}
          </span>
        </h4>
        <Link href={`/support/ticket/${props.id}`}>
          <Button variant="secondary" className="w-56">
            View ticket
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Ticket;
