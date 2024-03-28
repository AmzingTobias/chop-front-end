import { ITicketInfoEntryStaff } from "@/app/data/support";
import SearchBar from "@/components/SearchBar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SetStateAction, useEffect, useState } from "react";

interface ISpportTicketsSearchProps {
  fetchedTickets: ITicketInfoEntryStaff[];
  setFilteredTickets: React.Dispatch<SetStateAction<ITicketInfoEntryStaff[]>>;
}

const SupportTicketsSearch: React.FC<ISpportTicketsSearchProps> = ({
  fetchedTickets,
  setFilteredTickets,
}) => {
  const [selectedFilterOption, setSelectedFilterOption] =
    useState<string>("-1");
  const [showAssigned, setShowAssigned] = useState<boolean>(true);
  const [showClosed, setShowClosed] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const filterOptions: { display: string; value: string }[] = [
    { display: "Id", value: "-1" },
    { display: "Title", value: "0" },
  ];

  useEffect(() => {
    const filteredResults = fetchedTickets.filter((ticket) => {
      if (showClosed && showAssigned) {
        if (searchQuery === "") {
          return true;
        } else {
          if (selectedFilterOption === "-1") {
            return ticket.id.toString().includes(searchQuery);
          } else {
            return ticket.title
              .toLowerCase()
              .includes(searchQuery.toLowerCase());
          }
        }
      } else if (showClosed && !showAssigned) {
        if (ticket.assignedSupportId !== null) {
          return false;
        }
        if (searchQuery === "") {
          return true;
        } else {
          if (selectedFilterOption === "-1") {
            return ticket.id.toString().includes(searchQuery);
          } else {
            return ticket.title
              .toLowerCase()
              .includes(searchQuery.toLowerCase());
          }
        }
      } else if (!showClosed && showAssigned) {
        if (ticket.closedOn !== null) {
          return false;
        }
        if (searchQuery === "") {
          return true;
        } else {
          if (selectedFilterOption === "-1") {
            return ticket.id.toString().includes(searchQuery);
          } else {
            return ticket.title
              .toLowerCase()
              .includes(searchQuery.toLowerCase());
          }
        }
      } else {
        if (ticket.closedOn !== null || ticket.assignedSupportId !== null) {
          return false;
        }
        if (searchQuery === "") {
          return true;
        } else {
          if (selectedFilterOption === "-1") {
            return ticket.id.toString().includes(searchQuery);
          } else {
            return ticket.title
              .toLowerCase()
              .includes(searchQuery.toLowerCase());
          }
        }
      }
    });
    setFilteredTickets(filteredResults);
  }, [
    searchQuery,
    selectedFilterOption,
    showClosed,
    showAssigned,
    fetchedTickets,
    setFilteredTickets,
  ]);

  return (
    <div>
      <div className="flex flex-col gap-2">
        <SearchBar
          onSearchChange={(query) => {
            setSearchQuery(query);
          }}
        />
        <div className="flex flex-row items-center gap-4">
          <Label>Search by:</Label>
          <RadioGroup
            defaultValue="-1"
            className="flex flex-row"
            value={selectedFilterOption}
            onValueChange={setSelectedFilterOption}
          >
            {filterOptions.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option.value}
                  id={`${option.value}-radio-group`}
                />
                <Label htmlFor={`${option.value}-radio-group`}>
                  {option.display}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <Label>Show: </Label>
        <div className="flex flex-row items-center gap-2">
          <Input
            id="show-closed-checkbox"
            className="w-fit scale-110"
            type="checkbox"
            checked={showClosed}
            onChange={(event) => setShowClosed(event.currentTarget.checked)}
          />
          <Label htmlFor="show-closed-checkbox">Closed</Label>
        </div>
        <div className="flex flex-row items-center gap-2">
          <Input
            id="show-assigned-checkbox"
            className="w-fit scale-110"
            type="checkbox"
            checked={showAssigned}
            onChange={(event) => setShowAssigned(event.currentTarget.checked)}
          />
          <Label htmlFor="show-assigned-checkbox">Assigned</Label>
        </div>
      </div>
    </div>
  );
};

export default SupportTicketsSearch;
