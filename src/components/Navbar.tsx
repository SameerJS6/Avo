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

type Props = {};

export default function Navbar({}: Props) {
  return (
    <NavbarUI shouldHideOnScroll>
      <NavbarBrand>
        <div className="flex items-center justify-between w-full">
          <Link to="/" className="font-bold text-3xl text-inherit">
            AVO
          </Link>
          <div className="grid lg:hidden items-center">
            <Sidebar />
          </div>
        </div>
      </NavbarBrand>

      <NavbarContent justify="end" className="items-center hidden lg:flex ">
        {/* <NavbarItem> */}
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
        {/* </NavbarItem> */}
        {/* <NavbarItem> */}
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              : "hover:bg-accent hover:text-accent-foreground rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2"
          }
        >
          {/* <Button variant="ghost">Todos</Button> */}
          Todos
        </NavLink>
        {/* </NavbarItem> */}
        <Separator orientation="vertical" className="h-8" />
        <div className="flex gap-2">
          <NavbarItem>
            <ThemeToggle />
          </NavbarItem>
          <NavbarItem className="flex">
            <Logout style />
          </NavbarItem>
        </div>
      </NavbarContent>
    </NavbarUI>
  );
}
