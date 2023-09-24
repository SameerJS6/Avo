import { Button } from "@/components/ui/button";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTheme } from "@/context/ThemeContent";

type ThemeToggleProps = {
  // show?: boolean
};

export default function ThemeToggle({}: ThemeToggleProps) {
  const { setTheme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <SunIcon className="h-[1.2rem] w-[1.2rem] lg:w-[1.1rem] lg:h-[1.1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] lg:w-[1.1rem] lg:h-[1.1rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-1 w-32" align="start">
        <div className="flex flex-col">
          <Button
            variant="ghost"
            className="justify-start"
            onClick={() => setTheme("light")}
          >
            Light
          </Button>
          <Button
            variant="ghost"
            className="justify-start"
            onClick={() => setTheme("dark")}
          >
            Dark
          </Button>
          <Button
            variant="ghost"
            className="justify-start"
            onClick={() => setTheme("system")}
          >
            System
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
