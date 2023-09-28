import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNotes } from "@/context/NotesContext";
import { Tooltip } from "@nextui-org/react";

type Props = {};

export default function CreateTodo({}: Props) {
  const {
    isWaiting,
    setIsWaiting,
    todoDetails,
    handleTodoDetails,
    createTodo,
  } = useNotes();

  const handleCloseDialog = () => {
    setIsWaiting((prevIsWaiting) => ({
      ...prevIsWaiting,
      isDialogOpen: !prevIsWaiting.isDialogOpen,
    }));
  };

  return (
    <>
      <Dialog open={isWaiting.isDialogOpen} onOpenChange={handleCloseDialog}>
        <Tooltip
          content="Create A New Note"
          closeDelay={50}
          color="foreground"
          classNames={{
            base: "py-2 px-4 shadow-xl rounded-lg",
          }}
        >
          <DialogTrigger asChild>
            <Button
              size="icon"
              className="slide-in fixed bottom-12 right-8 rounded-2xl p-8 shadow-lg transition-all duration-250 ease-in-out active:scale-95 sm:right-12 lg:bottom-16 lg:right-16"
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  className="h-6 w-6 stroke-primary-foreground sm:h-7 sm:w-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </div>
            </Button>
          </DialogTrigger>
        </Tooltip>
        <DialogContent className="createModalWidth rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold tracking-tight">
              Create Note
            </DialogTitle>
            <DialogDescription>
              To create a note, Simply enter a title and start typing.
            </DialogDescription>
          </DialogHeader>
          <div>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    type="text"
                    id="title"
                    name="title"
                    autoComplete="off"
                    value={(todoDetails && todoDetails?.title) || ""}
                    onChange={handleTodoDetails}
                    className=" font-semibold placeholder:font-medium placeholder:tracking-[0.15px] max-sm:leading-7 sm:py-5 sm:text-lg"
                    placeholder="Enter your Title"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    rows={3}
                    placeholder="Type your Description here."
                    id="description"
                    name="description"
                    className="leading-6"
                    value={(todoDetails && todoDetails?.description) || ""}
                    onChange={handleTodoDetails}
                  />
                </div>
              </div>
            </form>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button
              onClick={createTodo}
              className="transition-all duration-250 ease-in-out active:scale-95"
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
