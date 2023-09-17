import { Tooltip } from "@nextui-org/react";
import { Button } from "./ui/button";
import { useNotes } from "@/context/NotesContext";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { Checkbox } from "@nextui-org/react";

type TodoProps = {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
};

export default function Todo({
  description,
  title,
  id,
  isCompleted,
}: TodoProps) {
  const { removeTodo, handleEditDialog, updateComplete } = useNotes();

  return (
    <article
      key={title}
      className="relative bg-secondary break-inside-avoid mb-4 sm:mb-4 text-secondary-foreground p-4 rounded-xl space-y-4 hover:shadow-md group border border-primary-100 hover:border-primary-200"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
        <Tooltip
          content="Delete Note"
          closeDelay={50}
          color="foreground"
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
      </div>
      <div className="space-y-2">
        <p className="leading-6">{description}</p>
        <Tooltip
          content="Edit Note"
          closeDelay={50}
          color="foreground"
          classNames={{
            base: "py-2 px-4 shadow-xl rounded-lg",
          }}
        >
          <Button
            onClick={() => handleEditDialog(id)}
            size="icon"
            variant="outline"
            className="pointer-events-none opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto tranition-all duration-250 ease-soft-spring"
          >
            <Pencil1Icon />
          </Button>
        </Tooltip>
      </div>

      <input
        type="checkbox"
        checked={isCompleted}
        onChange={(e) => updateComplete(id, e)}
      />
    </article>
  );
}
