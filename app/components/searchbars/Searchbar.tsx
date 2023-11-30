"use client";

import { FaSearch } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ISearchbarProps {
  variant?: "secondary" | "accent";
}

export const Searchbar: React.FC<ISearchbarProps> = ({
  variant = "secondary",
}) => {
  return (
    <div className="flex items-center w-full space-x-2">
      <Input
        type="text"
        className={`bg-transparent ${
          variant === "accent" ? "border-accent focus-visible:ring-accent" : ""
        }`}
        placeholder="Search"
      />
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
    </div>
  );
};

export default Searchbar;
