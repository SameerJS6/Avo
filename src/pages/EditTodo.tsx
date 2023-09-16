import {
  Dialog,
  //   DialogTrigger,
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
  const { editingTodo, editTodo, isEditing, setIsEditing, setEditingTodo } =
    useNotes();
  return (
    <Dialog open={isEditing} onOpenChange={setIsEditing}>
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
            <div className="grid w-full gap-4 items-center">
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
                  className=" sm:text-lg font-semibold max-sm:leading-7 sm:py-5 placeholder:font-medium placeholder:tracking-[0.15px]"
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
          <Button onClick={() => setIsEditing(false)} variant="outline">
            Cancel
          </Button>
          <Button
            onClick={editTodo}
            className="active:scale-95 transition-all duration-250Type '(id: string) => Promise<void>' is not assignable to type 'Mous ease-in-out"
          >
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
