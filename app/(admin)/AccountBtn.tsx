import { BiSolidUser } from "react-icons/bi";

interface IAccountBtnProps {
  email: string;
}

const AccountBtn: React.FC<IAccountBtnProps> = ({ email }) => {
  const [username, domain] = email.split("@");
  return (
    <div className="text-secondary flex flex-row w-full items-center cursor-pointer h-fit gap-1">
      <BiSolidUser className={"text-3xl"} />
      <div className="flex flex-col">
        <p className="text-base font-bold">{username}</p>
        <p className="text-xs font-light">@{domain}</p>
      </div>
    </div>
  );
};

export default AccountBtn;
