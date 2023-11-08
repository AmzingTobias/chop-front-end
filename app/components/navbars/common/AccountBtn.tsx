import Link from "next/link";
import { BiUser } from "react-icons/bi";

const AccountBtn = () => {
  return (
    <div className="hover:cursor-pointer hover:text-gray-300">
      <Link href={"/login"}>
        <BiUser />
      </Link>
    </div>
  );
};

export default AccountBtn;
