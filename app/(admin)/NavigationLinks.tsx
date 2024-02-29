"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { TNavigationLinks } from "../data/navigationLinks";
import Link from "next/link";

interface INavigationLinksProps {
  navLinks: TNavigationLinks[];
}

const NavigationLinks: React.FC<INavigationLinksProps> = ({ navLinks }) => {
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ScrollArea className="text-center w-full font-semibold text-lg flex flex-col flex-grow">
      <div className="flex flex-col">
        {navLinks.map((link, index) => (
          <Link
            className={`${
              pathname === link.path
                ? "text-secondary font-bold"
                : "text-primary"
            }
            hover:opacity-80
            `}
            key={index}
            href={link.path}
          >
            {link.displayName}
          </Link>
        ))}
      </div>
    </ScrollArea>
  );
};

export default NavigationLinks;
