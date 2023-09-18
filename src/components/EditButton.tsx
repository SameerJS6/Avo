import { useNotes } from '@/context/NotesContext';
import { Tooltip } from '@nextui-org/react';
import { Button } from './ui/button';
import { Pencil1Icon } from '@radix-ui/react-icons';

type EditButtonProps = {
    id: string
}

export default function EditButton({id}: EditButtonProps) {
    const {handleEditDialog} = useNotes()
  return (
    <Tooltip
      content="Edit Note"
      closeDelay={50}
      placement="bottom"
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
  );
}