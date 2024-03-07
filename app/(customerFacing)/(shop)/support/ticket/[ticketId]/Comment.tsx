import { EAccountTypes } from "@/app/data/auth";
import { TTicketComment } from "@/app/data/support";

interface ICommentProps extends TTicketComment {
  loggedInAccountType: EAccountTypes;
}

const Comment: React.FC<ICommentProps> = (props) => {
  const loggedInCustomer = props.loggedInAccountType === EAccountTypes.customer;
  const authorCustomer = props.authorAccountType === EAccountTypes.customer;
  const loggedInAdminOrSupport = [
    EAccountTypes.admin,
    EAccountTypes.support,
  ].includes(props.loggedInAccountType);
  const authorAdminOrSupport = [
    EAccountTypes.admin,
    EAccountTypes.support,
  ].includes(props.authorAccountType);

  const authorTextForYourComments = loggedInCustomer ? "You" : "Chop Support";
  const authorTextForTheirComments = loggedInCustomer
    ? "Chop Support"
    : "Customer";

  return (
    <div
      className={`w-full flex ${
        (loggedInCustomer && authorCustomer) ||
        (loggedInAdminOrSupport && authorAdminOrSupport)
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`flex p-2 rounded-md shadow-md w-9/12 flex-col ${
          (loggedInCustomer && authorCustomer) ||
          (loggedInAdminOrSupport && authorAdminOrSupport)
            ? "bg-primary text-accent"
            : "bg-accent text-accent-foreground"
        }`}
      >
        <p>{props.comment}</p>
        <div className="text-right">
          <h5 className="font-semibold">
            {(loggedInCustomer && authorCustomer) ||
            (loggedInAdminOrSupport && authorAdminOrSupport)
              ? authorTextForYourComments
              : authorTextForTheirComments}
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
