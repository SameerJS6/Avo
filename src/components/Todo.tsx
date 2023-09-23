import { useNotes } from "@/context/NotesContext";
import { Checkbox } from "@nextui-org/react";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

type TodoProps = {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  index: number;
};

export default function Todo({
  description,
  title,
  id,
  isCompleted,
  index,
}: TodoProps) {
  const { updateComplete } = useNotes();
  let hasRenderedReminderRef = useRef(false);
  useEffect(() => {
    hasRenderedReminderRef.current = true;
  }, []);

  return (
    <motion.article
      key={title}
      data-overlay={isCompleted}
      className={`${
        isCompleted
          ? "bg-gradient-to-tr from-muted/80 to-border/25 text-muted-foreground line-through completedTodo"
          : "group bg-gradient-to-tl from-secondary text-secondary-foreground hover:shadow-md scale-100 hover:border-primary/20"
      } relative p-4 grid rounded-xl space-y-2 border border-border md:space-y-4 transition-all duration-250 ease-in-out`}
      variants={{
        hidden: (index) => ({
          opacity: 0,
          y: 20 * index,
        }),
        visible: (index) => ({
          opacity: 1,
          y: 0,
          transition: { delay: index * 0.05 },
        }),
        removed: {
          opacity: 0,
        },
      }}
      initial={hasRenderedReminderRef.current ? "visible" : "hidden"}
      animate="visible"
      exit="removed"
      custom={index}
    >
      <h1 className="text-lg sm:text-xl font-semibold tracking-tight">
        {title}
      </h1>

      <p className="leading-6">{description}</p>

      <div className="flex items-center self-end flex-row-reverse justify-between gap-4">
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
    </motion.article>
  );
}
