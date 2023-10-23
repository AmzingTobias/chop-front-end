"use client";

import { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import MobileSearchBar from "../../searchbars/MobileSearchBar";

const MobileOpenSearchPage = () => {
  const [navBarOpen, setNavBarOpen] = useState(false);

  return (
    <div>
      <div
        className="hover:cursor-pointer text-gray-900"
        onClick={() => setNavBarOpen((prevToggle) => !prevToggle)}
      >
        {navBarOpen ? <FiX /> : <FiSearch />}
      </div>
      <div
        className={`${
          navBarOpen ? "opacity-100" : "invisible opacity-0 "
        } transition-opacity duration-200`}
      >
        <MobileSearchBar />
      </div>
    </div>
  );
};

export default MobileOpenSearchPage;
