import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ITicketStatusProps {
  numberOfTicketsAwaitingResponse: number;
  numberOfTicketsAwaitingCustomerReply: number;
}

const TicketsStatus: React.FC<ITicketStatusProps> = ({
  numberOfTicketsAwaitingCustomerReply,
  numberOfTicketsAwaitingResponse,
}) => {
  return (
    <div className="bg-accent rounded-md p-2 text-accent-foreground flex flex-col gap-2 shadow-md">
      <Link className="w-full" href={"/support/ticket/create"}>
        <Button className="w-full" variant={"secondary"}>
          Create ticket
        </Button>
      </Link>
      <div>
        <h2 className="text-xl font-bold">Tickets in progress</h2>
        <div className="text-primary">
          <h4>Awaiting reply: {numberOfTicketsAwaitingResponse}</h4>
          <h4>
            Awaiting your response: {numberOfTicketsAwaitingCustomerReply}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default TicketsStatus;
