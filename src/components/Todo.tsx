import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "./ui/button";
import CustomCheckbox from "./CustomCheckbox";

type TodoProps = {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  index: number;
  isDragging: boolean;
};

export default function Todo({
  description,
  title,
  id,
  isCompleted,
  index,
  isDragging,
}: TodoProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const dndStyle = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  let hasRenderedReminderRef = useRef(false);
  useEffect(() => {
    hasRenderedReminderRef.current = true;
  }, []);

  return (
    <motion.article
      key={id}
      tabIndex={0}
      ref={setNodeRef}
      data-overlay={isCompleted}
      style={dndStyle}
      layout
      className={`${
        isCompleted
          ? "bg-gradient-to-tr from-muted/80 to-border/25 text-muted-foreground line-through completedTodo"
          : "group bg-gradient-to-tl from-secondary text-secondary-foreground hover:shadow-md scale-100 hover:border-primary/20"
      } ${
        isDragging ? "pointer-events-none" : "pointer-events-auto"
      } relative p-4 grid rounded-xl space-y-2 border border-border md:space-y-4 transition-all duration-250 ease-in-out isolate touch-manipulation`}
      variants={{
        hidden: (index) => ({
          opacity: 0,
          bottom: -10 * index,
        }),
        visible: (index) => ({
          opacity: 1,
          bottom: 0,
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
      <div className="flex justify-between items-center gap-4">
        <h1 className="text-lg sm:text-xl font-semibold tracking-tight">
          {title}
        </h1>
        <Button
          {...attributes}
          {...listeners}
          variant="ghost"
          size="icon"
          className="cursor-grab active:cursor-grabbing touch-manipulation"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            className="w-4 h-4 fill-current"
          >
            <path d="M360-160q-33 0-56.5-23.5T280-240q0-33 23.5-56.5T360-320q33 0 56.5 23.5T440-240q0 33-23.5 56.5T360-160Zm240 0q-33 0-56.5-23.5T520-240q0-33 23.5-56.5T600-320q33 0 56.5 23.5T680-240q0 33-23.5 56.5T600-160ZM360-400q-33 0-56.5-23.5T280-480q0-33 23.5-56.5T360-560q33 0 56.5 23.5T440-480q0 33-23.5 56.5T360-400Zm240 0q-33 0-56.5-23.5T520-480q0-33 23.5-56.5T600-560q33 0 56.5 23.5T680-480q0 33-23.5 56.5T600-400ZM360-640q-33 0-56.5-23.5T280-720q0-33 23.5-56.5T360-800q33 0 56.5 23.5T440-720q0 33-23.5 56.5T360-640Zm240 0q-33 0-56.5-23.5T520-720q0-33 23.5-56.5T600-800q33 0 56.5 23.5T680-720q0 33-23.5 56.5T600-640Z" />
          </svg>
        </Button>
      </div>

      <p className="leading-6">{description}</p>

      <div className="flex items-center self-end flex-row-reverse justify-between gap-4 translate-y-1 group-hover:translate-y-0 transition-transform duration-250 ease-in-out">
        <div className="space-x-2">
          <EditButton id={id} isCompleted={isCompleted} />
          <DeleteButton id={id} isCompleted={isCompleted} />
        </div>
        <CustomCheckbox id={id} isCompleted={isCompleted} />
      </div>
    </motion.article>
  );
}
