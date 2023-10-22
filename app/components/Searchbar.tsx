"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Searchbar = () => {
  const [inFocus, setInFocus] = useState(false);

  const focusStyles = "outline outline-3 outline-amber-400";

  return (
    <div
      className={`flex items-center rounded-2xl ${inFocus ? focusStyles : ""}`}
    >
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search..."
        className="w-full rounded-2xl p-2 focus:outline-none pl-4 bg-gray-100"
        onFocus={() => {
          setInFocus(true);
        }}
        onBlur={() => {
          setInFocus(false);
        }}
      />
      <div className="text-xl p-2.5 -ml-10 text-gray-900">
        <FaSearch />
      </div>
    </div>
  );
};

export default Searchbar;
