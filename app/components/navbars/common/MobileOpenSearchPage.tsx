"use client";

import { Dispatch, SetStateAction } from "react";
import { FiSearch, FiX } from "react-icons/fi";

interface IMobileOpenSearchPageProps {
  setSearchOpen: Dispatch<SetStateAction<boolean>>;
  searchOpen: boolean;
}

const MobileOpenSearchPage: React.FC<IMobileOpenSearchPageProps> = ({
  searchOpen,
  setSearchOpen,
}) => {
  return (
    <div>
      <div
        className="cursor-pointer hover:opacity-80"
        onClick={() => setSearchOpen((prevToggle) => !prevToggle)}
      >
        {searchOpen ? <FiX /> : <FiSearch />}
      </div>
    </div>
  );
};

export default MobileOpenSearchPage;
