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
import { Tooltip } from "@nextui-org/react";
import { useState } from "react";

type Props = {};

export default function CreateTodo({}: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <Tooltip
          content="Create a New Note"
          closeDelay={50}
          color="foreground"
          classNames={{
            base: "py-2 px-4 shadow-xl rounded-lg",
          }}
        >
          <DialogTrigger asChild>
            <Button
              size="icon"
              className="fixed bottom-12 right-8 sm:right-12 lg:bottom-16 lg:right-16 p-8 transition-all duration-250 ease-in-out shadow-lg rounded-2xl"
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  className="w-6 h-6 sm:w-7 sm:h-7 stroke-primary-foreground"
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
        <DialogContent className="px-4">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold tracking-tight">
              Create Note
            </DialogTitle>
            <DialogDescription>
              To create a note, simply enter a title and start typing.
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
                    className="text-lg font-semibold py-5"
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
                  />
                </div>
              </div>
            </form>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
