"use client";
import { TTicketLog, getLogsForTicket } from "@/app/data/support";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Log from "./Log";

interface ITicketLogsProps {
  ticketId: number;
}

const TicketLogs: React.FC<ITicketLogsProps> = ({ ticketId }) => {
  const useLogs = () => {
    const [logs, setLogs] = useState<TTicketLog[]>([]);
    useEffect(() => {
      getLogsForTicket(ticketId)
        .then((logs) =>
          setLogs([logs, logs, logs, logs, logs, logs, logs].flat())
        )
        .catch((err) => {
          console.error(err);
          setLogs([]);
        });
    }, []);
    return logs;
  };
  const logs = useLogs();
  return (
    <Sheet>
      <SheetTrigger className="bg-accent rounded-md text-accent-foreground p-2 w-[200px] hover:bg-opacity-80">
        View logs
      </SheetTrigger>
      <SheetContent className="max-h-screen overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>Ticket logs</SheetTitle>
          <SheetDescription>
            <div className="flex flex-col gap-4">
              {logs.map((log) => (
                <Log key={log.id} {...log} />
              ))}
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default TicketLogs;
