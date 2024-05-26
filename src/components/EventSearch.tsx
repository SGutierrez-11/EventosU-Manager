// components/EventSearch.tsx
import React from "react";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "./SearchIcon";

interface EventSearchProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const EventSearch: React.FC<EventSearchProps> = ({
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div>
      <Input
        label="Search"
        isClearable
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        radius="lg"
        placeholder="Type to search..."
        startContent={<SearchIcon />}
        classNames={{
          label: "text-black/50 dark:text-white/90",
          input: [
            "bg-transparent",
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
          ],
          innerWrapper: "bg-transparent",
          inputWrapper: [
            "shadow-xl",
            "bg-default-200/50",
            "dark:bg-default/60",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "hover:bg-default-200/70",
            "dark:hover:bg-default/70",
            "group-data-[focus=true]:bg-default-200/50",
            "dark:group-data-[focus=true]:bg-default/60",
            "!cursor-text",
          ],
        }}
      />
    </div>
  );
};

export default EventSearch;
