import Link from "next/link";
import { Raleway } from "next/font/google";
const raleway = Raleway({ subsets: ["latin"] });

interface IAccountFormSwitch {
  tabs: { display: string; linkPath: string }[];
  active: number;
}

const AccountFormSwitch: React.FC<IAccountFormSwitch> = ({ tabs, active }) => {
  return (
    <div className="flex flex-row justify-center my-2 text-2xl">
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`py-4 border-b-[1px] 
          ${index === active ? "border-b-primary" : "border-white"}`}
        >
          <Link
            className={`
            ${index < tabs.length - 1 ? "border-r-[1px]" : ""}
             border-white sm:px-10 px-6 hover:text-primary transition-colors duration-200 
            ${index === active ? "text-primary" : "text-white"} font-bold ${
              raleway.className
            }`}
            href={tab.linkPath}
          >
            {tab.display}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default AccountFormSwitch;
