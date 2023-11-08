import Link from "next/link";

interface IAccountFormSwitch {
  tabs: { display: string; linkPath: string }[];
  active: number;
}

const AccountFormSwitch: React.FC<IAccountFormSwitch> = ({ tabs, active }) => {
  return (
    <div className="flex flex-row text-2xl my-2">
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`py-4 border-b-2 
          ${index === active ? "border-b-sky-600" : "border-black/20"}`}
        >
          <Link
            className={`
            ${index < tabs.length - 1 ? "border-r-2" : ""}
             border-black/20 px-10 hover:text-sky-600 transition-colors duration-200 
            ${index === active ? "text-sky-600" : ""} font-bold`}
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
