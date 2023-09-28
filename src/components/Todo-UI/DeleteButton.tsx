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
        disabled={isCompleted}
        className={`${
          isCompleted ? "pointer-events-none disabled:opacity-0" : null
        } tranition-all pointer-events-none invisible opacity-0 duration-250 ease-in-out group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 group-focus-visible:pointer-events-auto group-focus-visible:visible group-focus-visible:opacity-100`}
      >
        <TrashIcon />
      </Button>
    </Tooltip>
  );
}
