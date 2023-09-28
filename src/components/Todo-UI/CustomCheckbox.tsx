import { useNotes } from "@/context/NotesContext";
import { Checkbox, Tooltip } from "@nextui-org/react";

type CheckboxProps = {
  id: string;
  isCompleted: boolean;
};

export default function CustomCheckbox({ id, isCompleted }: CheckboxProps) {
  const { updateComplete } = useNotes();
  return (
    <Tooltip
      content={isCompleted ? "Mark as Active" : "Mark as Completed"}
      closeDelay={50}
      color="foreground"
      placement="bottom"
      classNames={{
        base: "p-2 text-sm shadow-xl rounded-lg",
      }}
    >
      <form
        className={`${
          isCompleted
            ? "pointer-events-auto opacity-50"
            : "pointer-events-none invisible opacity-0 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 group-focus-visible:pointer-events-auto group-focus-visible:visible group-focus-visible:opacity-100 "
        }   tranition-all duration-250 ease-in-out`}
        onSubmit={(e) => e.preventDefault()}
      >
        <Checkbox
          radius="sm"
          isSelected={isCompleted}
          onChange={(e) => updateComplete(id, e)}
        />
      </form>
    </Tooltip>
  );
}
