"use client";

import Titlebar from "./navbars/Titlebar";
import HorizontalNavbar from "./navbars/HorizontalNavbar";
import VerticalNavbar from "./navbars/VerticalNavbar";
import { useState } from "react";
import { TNavigationLinks } from "../data/navigationLinks";
import MobileSearchBar from "./searchbars/MobileSearchBar";
import { EAccountTypes } from "../data/auth";

interface INavigationProps {
  minorNavbarBtns: TNavigationLinks[];
  accountTypeLoggedIn: EAccountTypes | undefined;
}

const Navigation: React.FC<INavigationProps> = ({
  minorNavbarBtns,
  accountTypeLoggedIn,
}) => {
  const [mobileNavbarOpen, setMobileNavbarOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <>
      <Titlebar
        setMobileNavbarOpen={setMobileNavbarOpen}
        accountTypeLoggedIn={accountTypeLoggedIn}
        setMobileSearchOpen={setMobileSearchOpen}
        mobileSearchOpen={mobileSearchOpen}
      />
      <VerticalNavbar
        className="flex md:hidden"
        navbarOpen={mobileNavbarOpen}
        setMobileNavbarOpen={setMobileNavbarOpen}
        navigationBtns={minorNavbarBtns}
      />
      <MobileSearchBar className="flex md:hidden" display={mobileSearchOpen} />
      <div className="hidden md:flex">
        <HorizontalNavbar navigationBtns={minorNavbarBtns} />
      </div>
    </>
  );
};

export default Navigation;
