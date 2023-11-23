"use client";

import { FaSearch } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Searchbar() {
  return (
    <div className="flex items-center w-full space-x-2">
      <Input
        type="text"
        className="bg-transparent text-background"
        placeholder="Search"
      />
      <Button type="submit" variant={"secondary"}>
        <FaSearch className="text-lg text-accent" />
      </Button>
    </div>
  );
}

export default Searchbar;
