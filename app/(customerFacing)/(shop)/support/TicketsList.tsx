import SectionHeading from "@/app/components/SectionHeading";
import { ITicketInfoEntry } from "@/app/data/support";
import Ticket from "./Ticket";

interface ITicketListProps {
  sectionHeadingText: string;
  ticketsToDisplay: ITicketInfoEntry[];
}
const TicketsList: React.FC<ITicketListProps> = ({
  sectionHeadingText,
  ticketsToDisplay,
}) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <SectionHeading text={sectionHeadingText} />
      {ticketsToDisplay.map((ticket) => (
        <Ticket key={ticket.id} {...ticket} />
      ))}
    </div>
  );
};

export default TicketsList;
