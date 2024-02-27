"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FaSearch } from "react-icons/fa";

interface ISearchbarProps {
  variant?: "secondary" | "accent";
  onSearchChange: (searchQuery: string) => void;
}

const SearchBar: React.FC<ISearchbarProps> = ({
  variant = "secondary",
  onSearchChange,
}) => {
  const [searchInFocus, setSearchInFocus] = useState(false);

  return (
    <div
      className="flex w-full flex-col"
      onBlur={(e) => {
        const currentTarget = e.currentTarget;

        // Give browser time to focus the next element
        requestAnimationFrame(() => {
          // Check if the new focused element is a child of the original container
          if (!currentTarget.contains(document.activeElement)) {
            setSearchInFocus(false);
          }
        });
      }}
      tabIndex={1}
    >
      <form
        className="w-full flex flex-row space-x-2 items-center"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <div className="flex flex-col w-full">
          <Input
            onFocus={() => setSearchInFocus(true)}
            onChange={(event) => {
              onSearchChange(event.target.value);
            }}
            type="text"
            className={`bg-transparent  ${
              variant === "accent"
                ? "border-accent focus-visible:ring-accent"
                : ""
            }`}
            placeholder="Search"
          />
        </div>
        <Button
          type="submit"
          className={`${variant === "accent" ? "bg-accent" : ""}`}
          variant={"secondary"}
        >
          <FaSearch
            className={`text-lg ${
              variant === "accent" ? "text-accent-foreground" : "text-accent"
            }`}
          />
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;
