"use client";

import WebsiteTitle from "@/app/components/navbars/common/Website-Title";
import Link from "next/link";
import { TNavigationLinks } from "@/app/data/navigationLinks";
import { usePathname } from "next/navigation";
import AccountBtn from "./AccountBtn";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ISidebarProps {
  navLinks: TNavigationLinks[];
}

const Sidebar: React.FC<ISidebarProps> = ({ navLinks }) => {
  const pathname = usePathname();

  return (
    <div className="w-[200px] flex-col h-screen bg-accent text-primary p-3">
      <div className="h-full flex flex-col gap-4 flex-grow">
        <WebsiteTitle onClickLink="/admin/" />
        <hr className="bg-primary border-primary" />
        <ScrollArea className="text-center w-full font-semibold text-lg flex flex-grow">
          <nav className="flex flex-col">
            {navLinks.map((link, index) => (
              <Link
                className={`${
                  pathname === link.path
                    ? "text-secondary font-bold"
                    : "text-primary"
                }`}
                key={index}
                href={link.path}
              >
                {link.displayName}
              </Link>
            ))}
          </nav>
        </ScrollArea>
        <div className="items-end bg-[#060E18] p-2 rounded-md">
          <AccountBtn email="admin@chop.tdmd.co.uk" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
