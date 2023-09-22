import {
  Navbar as NavbarUI,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Tooltip,
} from "@nextui-org/react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import Logout from "./Auth/Logout";
import Sidebar from "./Sidebar";
import ThemeToggle from "./ThemeToggle";

type Props = {};

export default function Navbar({}: Props) {
  return (
    <NavbarUI shouldHideOnScroll>
      <NavbarBrand>
        <div className="flex items-center justify-between w-full">
          <Link to="/" className="font-bold text-3xl text-inherit">
            ACME
          </Link>
          <div className="grid lg:hidden items-center">
            <Sidebar />
          </div>
        </div>
      </NavbarBrand>

      <NavbarContent
        justify="end"
        className="items-center gap-8 hidden lg:flex"
      >
        <Tooltip
          content="View Todos"
          closeDelay={50}
          color="foreground"
          classNames={{
            base: "py-2 px-4 shadow-xl rounded-lg",
          }}
        >
          <NavbarItem isActive>
            <NavLink to="/dashboard">
              <Button variant="secondary">Todos</Button>
            </NavLink>
          </NavbarItem>
        </Tooltip>

        <div className="flex gap-2">
          <NavbarItem>
            <ThemeToggle />
          </NavbarItem>
          <NavbarItem className="flex">
            <Logout />
          </NavbarItem>
        </div>
      </NavbarContent>
    </NavbarUI>
  );
}
