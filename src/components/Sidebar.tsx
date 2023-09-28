import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Logout from "./Auth/Logout";
import { NavLink } from "react-router-dom";
import { Separator } from "./ui/separator";
import { useState } from "react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { buttonVariants } from "./ui/button";

type Props = {};

export default function Sidebar({}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-7 w-7"
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
          <SheetTitle>AVO</SheetTitle>
        </SheetHeader>

        <div className="my-12 flex flex-col gap-4">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "h-9 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground shadow-sm transition-colors hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                : "h-9 rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/dashboard"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "h-9 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground shadow-sm transition-colors hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                : "h-9 rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            }
          >
            Todos
          </NavLink>
          <Separator className="my-2" />
          <Logout style />
        </div>
        <div className="fixed bottom-8 ">
          <a
            target="_blank"
            href="https://github.com/SameerJS6"
            className={buttonVariants({ variant: "ghost", size: "lg" })}
          >
            <div className="flex items-center gap-2">
              <GitHubLogoIcon height={18} width={18} /> Github
            </div>
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
