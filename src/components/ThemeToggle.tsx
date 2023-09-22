import { Button } from "@/components/ui/button";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTheme } from "@/context/ThemeContent";

export default function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <div className="flex max-lg:gap-2 items-center rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0">
            <SunIcon className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <p className="lg:hidden">Light</p>
          </div>
          <div className="absolute flex max-lg:gap-2 items-center rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100">
            <MoonIcon className="h-[1.1rem] w-[1.1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <p className="lg:hidden">Dark</p>
          </div>
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
