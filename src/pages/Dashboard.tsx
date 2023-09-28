import { useNotes } from "@/context/NotesContext";
import CreateTodo from "./CreateTodo";
import EditTodo from "./EditTodo";
import Todo from "@/components/Todo-UI/Todo";
import { AnimatePresence, motion } from "framer-motion";
import FilterTodos from "@/components/Todo-UI/FilterTodos";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import SkeletonLoader from "@/components/Todo-UI/SkeletonLoader";

type Props = {};

export default function Dashboard({}: Props) {
  const { todos, isWaiting, setTodos } = useNotes();
  const [activeId, setActiveId] = useState<null | number | string>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const sensors = useSensors(
    mouseSensor,
    useSensor(TouchSensor),
    useSensor(KeyboardSensor),
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
    setIsDragging(true);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id === over?.id) return setIsDragging(false);
    setTodos((prevTodos) => {
      const oldIndex = prevTodos.findIndex((todo) => todo.id === active.id);
      const newIndex = prevTodos.findIndex((todo) => todo.id === over?.id);
      return arrayMove(prevTodos, oldIndex, newIndex);
    });
    setIsDragging(false);
    setActiveId(null);
  };

  if (isWaiting.isTodoFetching) return <SkeletonLoader />;

  if (todos.length === 0)
    return (
      <main>
        <motion.h1
          className="centered bg-gradient-to-br from-foreground to-primary/50 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 25, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Nothing to see here!
        </motion.h1>
        <CreateTodo />
      </main>
    );

  return (
    <main className="minHeight mx-auto max-w-[1980px] space-y-10 px-4 py-8 sm:px-8 sm:py-16 md:space-y-16 lg:p-24 xl:p-28 xl:py-20">
      <div className="flex items-center justify-between gap-4 md:items-end">
        <motion.h1
          className="w-[5.5ch] bg-gradient-to-br from-foreground to-primary/50 bg-clip-text text-4xl font-bold uppercase tracking-tighter text-transparent sm:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Todos
        </motion.h1>
        <FilterTodos />
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid gap-4 min-[550px]:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            <SortableContext items={todos} strategy={rectSortingStrategy}>
              {todos.map((todo, index) => {
                return (
                  <Todo
                    key={todo.id}
                    {...todo}
                    index={index}
                    isDragging={isDragging}
                  />
                );
              })}
            </SortableContext>
          </AnimatePresence>
        </div>

        <DragOverlay>
          {todos
            .filter((todo) => todo.id === activeId)
            .map((item) => {
              return (
                <Todo
                  key={item.id}
                  {...item}
                  index={0}
                  isDragging={isDragging}
                />
              );
            })}
        </DragOverlay>
      </DndContext>
      <CreateTodo />
      <EditTodo />
    </main>
  );
}
