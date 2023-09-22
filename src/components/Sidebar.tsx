import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Logout from "./Auth/Logout";
import ThemeToggle from "./ThemeToggle";
import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

type Props = {};

export default function Sidebar({}: Props) {
  return (
    <Sheet>
      <SheetTrigger>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-7 h-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader className="text-left">
          <SheetTitle>ACME</SheetTitle>
        </SheetHeader>

        <div className="my-12 gap-4 flex flex-col">
          <NavLink
            to="/dashboard"
            // className={buttonVariants({ variant: "ghost" })}
          >
            <Button variant="default" className="w-full">
              Todos
            </Button>
          </NavLink>
          <ThemeToggle />
          <Separator className="my-2" />
          <Logout style={true} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
