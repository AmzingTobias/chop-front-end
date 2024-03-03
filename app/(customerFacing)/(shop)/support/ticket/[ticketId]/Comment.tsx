import { TTicketComment } from "@/app/data/support";

interface ICommentProps extends TTicketComment {
  loggedInAccountId: number;
}

const Comment: React.FC<ICommentProps> = (props) => {
  return (
    <div
      className={`w-full flex ${
        props.loggedInAccountId === props.authorId
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`flex p-2 rounded-md shadow-md w-9/12 flex-col ${
          props.loggedInAccountId === props.authorId
            ? "bg-primary text-accent"
            : "bg-accent text-accent-foreground"
        }`}
      >
        <p>{props.comment}</p>
        <div className="text-right">
          <h5 className="font-semibold">
            {props.loggedInAccountId === props.authorId
              ? "You"
              : "Chop Support"}
          </h5>
          <small className="whitespace-nowrap">
            {new Date(props.createdOn).toLocaleString()}
          </small>
        </div>
      </div>
    </div>
  );
};

export default Comment;
