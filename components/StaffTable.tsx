"use client";

import { ReactNode, useEffect, useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { cn } from "@/lib/utils";

type TTableHeading = {
  sortable: boolean;
  className?: String;
  display: String;
};
type TTableEntry = {
  className?: string;
  sortValue: string | number | Date | undefined;
  display: string | number | ReactNode;
};
export type TTableRow = {
  id: number;
  cells: TTableEntry[];
};

interface ITableProps {
  headings: TTableHeading[];
  rows: TTableRow[];
  caption?: String;
}

const StaffTable: React.FC<ITableProps> = ({ headings, rows, caption }) => {
  const [filteredRows, setFilteredRows] = useState<TTableRow[]>([...rows]);
  const [sortedBy, setSortedBy] = useState<{
    headingIndex: number;
    desc: boolean;
  }>({ headingIndex: 0, desc: true });

  useEffect(() => {
    const sortedRows = [...rows].sort((a, b) => {
      const aElement = a.cells[sortedBy.headingIndex].sortValue;
      const bElement = b.cells[sortedBy.headingIndex].sortValue;

      if (typeof aElement === "number" && typeof bElement === "number") {
        return sortedBy.desc ? aElement - bElement : bElement - aElement;
      } else if (typeof aElement === "string" && typeof bElement === "string") {
        return sortedBy.desc
          ? aElement.localeCompare(bElement)
          : bElement.localeCompare(aElement);
      } else if (
        typeof aElement !== "undefined" &&
        typeof bElement !== "undefined"
      ) {
        // Will be a date
        return sortedBy.desc
          ? (aElement as any) - (bElement as any)
          : (bElement as any) - (aElement as any);
      } else {
        // Decide how to handle other data types or return 0 if no sorting is needed.
        return 0;
      }
    });
    setFilteredRows(sortedRows);
  }, [sortedBy, rows]);

  return (
    <ScrollArea className="w-full">
      <Table>
        {typeof caption === "string" && <TableCaption>{caption}</TableCaption>}
        <TableHeader>
          <TableRow>
            {headings.map((heading, index) => (
              <TableHead
                key={index}
                onClick={() => {
                  if (heading.sortable) {
                    setSortedBy((prev) => ({
                      desc: sortedBy.headingIndex === index ? !prev.desc : true,
                      headingIndex: index,
                    }));
                  }
                }}
                className={`
                font-semibold
                cursor-default
                select-none
                ${heading.sortable ? "hover:opacity-80" : ""}
                text-accent bg-primary text-xl
                ${index === 0 ? "rounded-tl-md" : ""}
                ${index === headings.length - 1 ? "rounded-tr-md" : ""}
                `}
              >
                <div
                  className={cn(
                    "flex flex-row items-center w-full",
                    heading.className
                  )}
                >
                  {heading.display}
                  {sortedBy.headingIndex === index &&
                    (sortedBy.desc ? <IoIosArrowUp /> : <IoIosArrowDown />)}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRows.map((row, rowIndex) => (
            <TableRow key={row.id} className="text-accent-foreground">
              {row.cells.map((cell, index) => (
                <TableCell
                  key={index}
                  className={`
                  font-medium
                  ${rowIndex % 2 === 0 ? "bg-accent" : "bg-accent/80"}
                  ${
                    rowIndex === rows.length - 1
                      ? "first-of-type:rounded-bl-md last-of-type:rounded-br-md"
                      : ""
                  }
                  ${cell.className === undefined ? "" : cell.className}
                  `}
                >
                  {cell.display}
                </TableCell>
              ))}
            </TableRow>
          ))}
          {/* <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell> */}
          {/* </TableRow> */}
        </TableBody>
      </Table>
      {/* 
      <table className="w-full">
        <thead>
          <tr className="rounded-md">
            {headings.map((heading, index) => (
              <th
                key={index}
                onClick={heading.handleOnClick}
                className={`bg-primary text-accent p-2 text-xl first-of-type:rounded-tl-md last-of-type:rounded-tr-md ${
                  index === headings.length - 1
                    ? ""
                    : "border-r-accent border-r-[1px]"
                }`}
              >
                {heading.display}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={row.id} className="text-accent-foreground">
              {row.entries.map((entry, index) => (
                <td
                  key={index}
                  className={`p-2 
                  ${rowIndex % 2 === 0 ? "bg-accent" : "bg-accent/80"}
                  ${
                    rowIndex === rows.length - 1
                      ? "first-of-type:rounded-bl-md last-of-type:rounded-br-md"
                      : ""
                  }
                  ${
                    index === row.entries.length - 1
                      ? ""
                      : "border-r-accent-foreground border-r-[1px]"
                  }`}
                >
                  {entry.display}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table> */}
    </ScrollArea>
  );
};

export default StaffTable;
