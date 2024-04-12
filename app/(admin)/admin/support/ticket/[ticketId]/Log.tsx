import { TTicketLog } from "@/app/data/support";

const Log: React.FC<TTicketLog> = (props) => {
  return (
    <div className="text-accent font-semibold">
      <p>{new Date(props.timestamp).toLocaleString()}</p>
      <p>{props.email}</p>
      <p>
        {props.type}
        {props.comment !== null ? `: ${props.comment}` : ""}{" "}
      </p>
    </div>
  );
};

export default Log;
