import { useState } from "react";
import { Button } from "./ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { useNotes } from "@/context/NotesContext";

type Props = {};

export default function FilterTodos({}: Props) {
  const { setTodos, todosBackup } = useNotes();
  const [filterType, setFilterType] = useState("all");

  const handleTodoFilter = (filter: string) => {
    switch (filter) {
      case "active":
        setFilterType(filter);
        setTodos(todosBackup.filter((todo) => todo.isCompleted !== true));
        break;
      case "completed":
        setFilterType(filter);
        setTodos(todosBackup.filter((todo) => todo.isCompleted === true));
        break;
      default:
        setFilterType("all");
        setTodos(todosBackup);
    }
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            className="w-5 h-5 mr-2 fill-current"
          >
            <path d="M440-240q-17 0-28.5-11.5T400-280q0-17 11.5-28.5T440-320h80q17 0 28.5 11.5T560-280q0 17-11.5 28.5T520-240h-80ZM280-440q-17 0-28.5-11.5T240-480q0-17 11.5-28.5T280-520h400q17 0 28.5 11.5T720-480q0 17-11.5 28.5T680-440H280ZM160-640q-17 0-28.5-11.5T120-680q0-17 11.5-28.5T160-720h640q17 0 28.5 11.5T840-680q0 17-11.5 28.5T800-640H160Z" />
          </svg>
          Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-1 w-32" align="end">
        <div className="flex flex-col gap-0.5">
          <Button
            variant={filterType === "all" ? "secondary" : "ghost"}
            className="justify-start px-2"
            onClick={() => handleTodoFilter("all")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              className={`${
                filterType === "all"
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-0.5"
              } w-4 h-4 mr-1 fill-current transition-all duration-250 ease-in-out`}
            >
              <path d="m382-354 339-339q12-12 28.5-12t28.5 12q12 12 12 28.5T778-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z" />
            </svg>
            All
          </Button>

          <Button
            variant={filterType === "active" ? "secondary" : "ghost"}
            className="justify-start px-2"
            onClick={() => handleTodoFilter("active")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              className={`${
                filterType === "active"
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-0.5"
              } w-4 h-4 mr-1 fill-current transition-all duration-250 ease-in-out`}
            >
              <path d="m382-354 339-339q12-12 28.5-12t28.5 12q12 12 12 28.5T778-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z" />
            </svg>
            Active
          </Button>

          <Button
            variant={filterType === "completed" ? "secondary" : "ghost"}
            className="justify-start px-2"
            onClick={() => handleTodoFilter("completed")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              className={`${
                filterType === "completed"
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-0.5"
              } w-4 h-4 mr-1 fill-current transition-all duration-250 ease-in-out`}
            >
              <path d="m382-354 339-339q12-12 28.5-12t28.5 12q12 12 12 28.5T778-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z" />
            </svg>
            Completed
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
