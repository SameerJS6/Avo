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

type Props = {};

export default function Navbar({}: Props) {
  const { currentUser } = useAuth();
  return (
    <NavbarUI shouldHideOnScroll>
      <NavbarBrand>
        <div className="flex items-center justify-between w-full">
          <Link to="/" className="font-bold text-3xl text-inherit">
            AVO
          </Link>
          {currentUser && (
            <div className="flex gap-2 lg:hidden items-center">
              <ThemeToggle />
              <Sidebar />
            </div>
          )}
        </div>
      </NavbarBrand>

      {currentUser && (
        <NavbarContent justify="end" className="items-center hidden lg:flex ">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                : "hover:bg-accent hover:text-accent-foreground rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                : "hover:bg-accent hover:text-accent-foreground rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2"
            }
          >
            Todos
          </NavLink>
          <Separator orientation="vertical" className="h-8" />

          <div className="flex gap-2">
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
