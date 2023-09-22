import { useNotes } from "@/context/NotesContext";
import CreateTodo from "./CreateTodo";
import EditTodo from "./EditTodo";
import { Spinner } from "@nextui-org/react";
import Todo from "@/components/Todo";
import { AnimatePresence, motion } from "framer-motion";

type Props = {};

export default function Dashboard({}: Props) {
  const { todos, isWaiting } = useNotes();

  if (isWaiting.isTodoFetching)
    return <Spinner size="lg" className="centered" />;

  if (todos.length === 0)
    return (
      <motion.h1
        className="centered"
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        Nothing to see here!
      </motion.h1>
    );

  return (
    <main className="py-8 px-4 sm:py-16 sm:px-8 lg:p-24 xl:p-28 xl:py-20 space-y-10 md:space-y-16">
      <h1 className="text-4xl uppercase tracking-tight sm:text-5xl lg:text-6xl">
        Todos
      </h1>
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
