import { useNotes } from "@/context/NotesContext";
import CreateTodo from "./CreateTodo";
import EditTodo from "./EditTodo";
import { Spinner } from "@nextui-org/react";
import Todo from "@/components/Todo";
import { AnimatePresence, motion } from "framer-motion";
import FilterTodos from "@/components/FilterTodos";

type Props = {};

export default function Dashboard({}: Props) {
  const { todos, isWaiting } = useNotes();

  if (isWaiting.isTodoFetching)
    return <Spinner size="lg" className="centered" />;

  if (todos.length === 0)
    return (
      <motion.h1
        className="centered"
        initial={{ opacity: 0, y: 25, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        Nothing to see here!
      </motion.h1>
    );

  return (
    <main className="max-w-[1980px] mx-auto py-8 px-4 sm:py-16 sm:px-8 lg:p-24 xl:p-28 xl:py-20 space-y-10 md:space-y-16">
      <div className="flex justify-between items-center md:items-end gap-4">
        <motion.h1
          className="w-[5.5ch] text-4xl uppercase font-bold tracking-tighter sm:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-br from-foreground to-primary/50"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Todos
        </motion.h1>
        <FilterTodos />
      </div>
      <div className="grid min-[550px]:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {todos.map((todo, index) => {
            return <Todo key={todo.id} {...todo} index={index} />;
          })}
        </AnimatePresence>
      </div>
      <CreateTodo />
      <EditTodo />
    </main>
  );
}
