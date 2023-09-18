import { useNotes } from "@/context/NotesContext";
import { Tooltip } from "@nextui-org/react";
import { Button } from "./ui/button";
import { TrashIcon } from "@radix-ui/react-icons";

type DeleteButtonProps = { id: string };

export default function DeleteButton({ id }: DeleteButtonProps) {
  const { removeTodo } = useNotes();
  return (
    <Tooltip
      content="Delete Note"
      closeDelay={50}
      color="foreground"
      placement="bottom"
      classNames={{
        base: "py-2 px-4 shadow-xl rounded-lg",
      }}
    >
      <Button
        onClick={() => removeTodo(id)}
        variant="destructive"
        size="icon"
        className="pointer-events-none group-hover:pointer-events-auto opacity-0 group-hover:opacity-100 rounded-xl transition-all duration-250 ease-in-out"
      >
        <TrashIcon />
      </Button>
    </Tooltip>
  );
}
