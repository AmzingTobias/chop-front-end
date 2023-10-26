"use client";

import Titlebar from "./navbars/Titlebar";
import Infobar from "./navbars/Infobar";
import HorizontalNavbar from "./navbars/HorizontalNavbar";
import VerticalNavbar from "./navbars/VerticalNavbar";
import { useState } from "react";

const Navigation = () => {
  const [mobileNavbarOpen, setMobileNavbarOpen] = useState(false);

  return (
    <>
      <div className="hidden md:flex">
        <Infobar />
      </div>
      <Titlebar setMobileNavbarOpen={setMobileNavbarOpen} />
      {mobileNavbarOpen ? (
        <VerticalNavbar setMobileNavbarOpen={setMobileNavbarOpen} />
      ) : (
        <></>
      )}
      <div className="hidden md:flex">
        <HorizontalNavbar />
      </div>
    </>
  );
};

export default Navigation;
