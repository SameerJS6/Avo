import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNotes } from "@/context/NotesContext";

type EditTodoProps = {};

export default function EditTodo({}: EditTodoProps) {
  const { editingTodo, editTodo, setEditingTodo, isWaiting, setIsWaiting } =
    useNotes();

  const handleCloseEditModal = () => {
    setIsWaiting((prevIsWaiting) => ({
      ...prevIsWaiting,
      isEditing: false,
    }));
  };

  const edit = () => {
    if (!editingTodo[0].title || !editingTodo[0].description) return;
    editTodo()
  }
  return (
    <Dialog open={isWaiting.isEditing} onOpenChange={handleCloseEditModal}>
      <DialogContent className="createModalWidth rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold tracking-tight">
            Edit Note
          </DialogTitle>
          <DialogDescription>
            To edit a note, Simply update the title and start typing.
          </DialogDescription>
        </DialogHeader>
        <div>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">Title</Label>
                <Input
                  type="text"
                  id="title"
                  autoComplete="off"
                  value={editingTodo.length === 1 ? editingTodo[0].title : ""}
                  onChange={(e) => {
                    const updatedTodo = [...editingTodo];
                    updatedTodo[0].title = e.target.value;
                    setEditingTodo(updatedTodo);
                  }}
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
                  className="leading-6"
                  value={
                    editingTodo.length === 1 ? editingTodo[0].description : ""
                  }
                  onChange={(e) => {
                    // Create a copy of the current editingTodo and update the title
                    const updatedTodo = [...editingTodo];
                    updatedTodo[0].description = e.target.value;
                    setEditingTodo(updatedTodo);
                  }}
                />
              </div>
            </div>
          </form>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button onClick={handleCloseEditModal} variant="outline">
            Cancel
          </Button>
          <Button
            onClick={edit}
            className="duration-250Type '(id: string) => Promise<void>' is not assignable to type 'Mous transition-all ease-in-out active:scale-95"
          >
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
