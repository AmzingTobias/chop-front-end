import { TNavigationLinks } from "@/app/data/navigationLinks";
import NavigationLinks from "../(admin)/NavigationLinks";
import AccountBtn from "../(admin)/AccountBtn";
import WebsiteTitle from "../components/navbars/common/Website-Title";
import { Suspense } from "react";

interface ISidebarProps {
  navLinks: TNavigationLinks[];
}

const Sidebar: React.FC<ISidebarProps> = ({ navLinks }) => {
  return (
    <Suspense>
      <div className="w-[200px] flex-col h-screen bg-accent text-primary p-3">
        <div className="h-full flex flex-col gap-4 flex-grow">
          <WebsiteTitle onClickLink="/support/support/ticket" />
          <hr className="bg-primary border-primary" />
          <NavigationLinks navLinks={navLinks} />
          <AccountBtn />
        </div>
      </div>
    </Suspense>
  );
};

export default Sidebar;
