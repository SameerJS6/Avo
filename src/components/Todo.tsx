import { useNotes } from "@/context/NotesContext";
import { Checkbox } from "@nextui-org/react";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

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
  const { updateComplete } = useNotes();

  return (
    <article
      key={title}
      data-overlay = {isCompleted}
      className={`${
        isCompleted
          ? "bg-gradient-to-tr from-muted/80 to-border/25 text-muted-foreground line-through scale-[97%]"
          : "group bg-gradient-to-tl from-secondary text-secondary-foreground hover:shadow-md  scale-100 hover:border-primary/20"
      } relative break-inside-avoid mb-4 sm:mb-4  p-4 rounded-xl space-y-2 border border-border md:space-y-4 transition-all duration-250 ease-in-out`}
    >
      <h1 className="text-lg sm:text-xl font-semibold tracking-tight">
        {title}
      </h1>

      <div className="">
        <p className="leading-6">{description}</p>
      </div>
      <div className="flex items-center flex-row-reverse justify-between gap-4">
        <div className="space-x-4">
          <EditButton id={id} />
          <DeleteButton id={id} />
        </div>
        <form
          className={`${
            isCompleted
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
          }   transition-all duration-250 ease-soft-spring`}
          onSubmit={(e) => e.preventDefault()}
        >
          <Checkbox
            radius="sm"
            isSelected={isCompleted}
            onChange={(e) => updateComplete(id, e)}
          />
        </form>
      </div>
    </article>
  );
}
