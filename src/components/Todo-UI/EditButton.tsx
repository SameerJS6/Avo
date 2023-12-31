import { useNotes } from "@/context/NotesContext";
import { Tooltip } from "@nextui-org/react";
import { Button } from "../ui/button";
import { Pencil1Icon } from "@radix-ui/react-icons";

type EditButtonProps = {
  id: string;
  isCompleted: boolean;
};

export default function EditButton({ id, isCompleted }: EditButtonProps) {
  const { handleEditDialog } = useNotes();
  return (
    <Tooltip
      content="Edit Note"
      closeDelay={50}
      placement="bottom"
      color="foreground"
      classNames={{
        base: "p-2 text-xs shadow-xl rounded-lg",
      }}
    >
      <Button
        onClick={() => handleEditDialog(id)}
        size="icon"
        variant="outline"
        disabled={isCompleted}
        className={`${
          isCompleted ? "pointer-events-none disabled:opacity-0 " : null
        } tranition-all pointer-events-none invisible opacity-0 duration-250 ease-in-out group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 group-focus-visible:pointer-events-auto group-focus-visible:visible group-focus-visible:opacity-100`}
      >
        <Pencil1Icon />
      </Button>
    </Tooltip>
  );
}
