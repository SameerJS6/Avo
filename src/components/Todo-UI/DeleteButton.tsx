import { useNotes } from "@/context/NotesContext";
import { Tooltip } from "@nextui-org/react";
import { Button } from "../ui/button";
import { TrashIcon } from "@radix-ui/react-icons";

type DeleteButtonProps = { id: string; isCompleted: boolean };

export default function DeleteButton({ id, isCompleted }: DeleteButtonProps) {
  const { removeTodo } = useNotes();
  return (
    <Tooltip
      content="Delete Note"
      closeDelay={50}
      color="foreground"
      placement="bottom"
      classNames={{
        base: "p-2 text-xs shadow-xl rounded-lg",
      }}
    >
      <Button
        onClick={() => removeTodo(id)}
        variant="destructive"
        size="icon"
        className={`${
          isCompleted
            ? "pointer-events-auto visible opacity-90"
            : "pointer-events-none invisible opacity-0 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 group-focus-visible:pointer-events-auto group-focus-visible:visible group-focus-visible:opacity-100"
        } transition-all duration-250 ease-in-out `}
      >
        <TrashIcon />
      </Button>
    </Tooltip>
  );
}
