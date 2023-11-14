"use client";

import Titlebar from "./navbars/Titlebar";
import Infobar from "./navbars/Infobar";
import HorizontalNavbar from "./navbars/HorizontalNavbar";
import VerticalNavbar from "./navbars/VerticalNavbar";
import { useState } from "react";
import { TNavigationLinks } from "../data/navigationLinks";

interface INavigationProps {
  minorNavbarBtns: TNavigationLinks[];
  accountLoggedIn: boolean;
}

const Navigation: React.FC<INavigationProps> = ({
  minorNavbarBtns,
  accountLoggedIn,
}) => {
  const [mobileNavbarOpen, setMobileNavbarOpen] = useState(false);

  return (
    <>
      <div className="hidden md:flex">
        <Infobar />
      </div>
      <Titlebar
        setMobileNavbarOpen={setMobileNavbarOpen}
        accountLoggedIn={accountLoggedIn}
      />
      {mobileNavbarOpen ? (
        <VerticalNavbar
          setMobileNavbarOpen={setMobileNavbarOpen}
          navigationBtns={minorNavbarBtns}
        />
      ) : (
        <></>
      )}
      <div className="hidden md:flex">
        <HorizontalNavbar navigationBtns={minorNavbarBtns} />
      </div>
    </>
  );
};

export default Navigation;
