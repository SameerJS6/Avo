import {
  Navbar as NavbarUI,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { Link, NavLink } from "react-router-dom";
import Logout from "./Auth/Logout";
import Sidebar from "./Sidebar";
import ThemeToggle from "./ThemeToggle";
import { Separator } from "./ui/separator";
import { useAuth } from "@/context/AuthContext";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { buttonVariants } from "./ui/button";

type Props = {};

export default function Navbar({}: Props) {
  const { currentUser } = useAuth();
  return (
    <NavbarUI shouldHideOnScroll>
      <NavbarBrand>
        <div className="flex w-full items-center justify-between">
          <Link to="/" className="text-3xl font-bold text-inherit">
            AVO
          </Link>
          {currentUser && (
            <div className="flex items-center gap-2 lg:hidden">
              <ThemeToggle />
              <Sidebar />
            </div>
          )}
        </div>
      </NavbarBrand>

      {currentUser && (
        <NavbarContent justify="end" className="hidden items-center lg:flex ">
          <NavLink
            to="/"
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
            className={({ isActive }) =>
              isActive
                ? "h-9 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground shadow-sm transition-colors hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                : "h-9 rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            }
          >
            Todos
          </NavLink>
          <Separator orientation="vertical" className="h-8" />

          <div className="flex gap-2">
            <NavbarItem>
              <a
                target="_blank"
                href="https://github.com/SameerJS6"
                className={buttonVariants({ variant: "ghost", size: "icon" })}
              >
                <GitHubLogoIcon height={18} width={18} />
              </a>
            </NavbarItem>
            <NavbarItem>
              <ThemeToggle />
            </NavbarItem>
            <NavbarItem>
              <Logout style />
            </NavbarItem>
          </div>
        </NavbarContent>
      )}

      {!currentUser && (
        <NavbarContent justify="end">
          <NavbarItem>
            <a
              target="_blank"
              href="https://github.com/SameerJS6"
              className={buttonVariants({ variant: "ghost", size: "icon" })}
            >
              <GitHubLogoIcon height={18} width={18} />
            </a>
          </NavbarItem>

          <NavbarItem>
            <ThemeToggle />
          </NavbarItem>

          <NavbarItem>
            <Logout style />
          </NavbarItem>
        </NavbarContent>
      )}
    </NavbarUI>
  );
}
