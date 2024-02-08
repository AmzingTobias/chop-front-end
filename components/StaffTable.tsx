import { ReactNode } from "react";
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

type TTableHeading = {
  handleOnClick?: () => void;
  className?: String;
  display: String;
};
type TTableEntry = {
  className?: string;
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
  return (
    <ScrollArea className="w-full">
      <Table>
        {typeof caption === "string" && <TableCaption>{caption}</TableCaption>}
        <TableHeader>
          <TableRow>
            {headings.map((heading, index) => (
              <TableHead
                key={index}
                onClick={heading.handleOnClick}
                className={`
                font-semibold
                ${
                  heading.className === undefined ? "" : heading.className
                } text-accent bg-primary text-xl
                ${index === 0 ? "rounded-tl-md" : ""}
                ${
                  index === headings.length - 1
                    ? "rounded-tr-md"
                    : "border-r-2 border-accent "
                }
                `}
              >
                {heading.display}
              </TableHead>
            ))}
            {/* <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, rowIndex) => (
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
                  ${
                    index === row.cells.length - 1
                      ? ""
                      : "border-r-accent-foreground border-r-[1px]"
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
