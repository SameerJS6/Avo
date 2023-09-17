import { useNotes } from "@/context/NotesContext";
import CreateTodo from "./CreateTodo";
import { Button } from "@/components/ui/button";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import EditTodo from "./EditTodo";
import { Tooltip } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";

type Props = {};

export default function Home({}: Props) {
  const { todos, removeTodo, handleEditDialog, isTodoFetching } = useNotes();

  if (isTodoFetching) return <Spinner size="lg" className="centered" />;

  if (todos.length === 0)
    return <h1 className="centered">Nothing to see here!</h1>;

  return (
    <main className="py-8 px-4 sm:py-16 sm:px-8 lg:p-24 xl:p-28 xl:py-20 space-y-10 md:space-y-16">
      <h1 className="text-4xl  uppercase tracking-tight sm:text-5xl lg:text-6xl">
        Todos
      </h1>
      <div className="min-[550px]:columns-2 lg:columns-3 gap-4 ">
        {todos.map((todo) => {
          const { description, title, id } = todo;
          return (
            <article
              key={title}
              className="bg-secondary break-inside-avoid mb-4 sm:mb-4 text-secondary-foreground p-4 rounded-xl space-y-4 hover:shadow-md group border border-primary-50 hover:border-primary-100"
            >
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold tracking-tight">
                  {title}
                </h1>
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
            </article>
          );
        })}
      </div>
      <CreateTodo />

      <EditTodo />
    </main>
  );
}
