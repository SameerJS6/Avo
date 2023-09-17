import {
  Navbar as NavbarUI,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Tooltip,
} from "@nextui-org/react";
import { Link, NavLink } from "react-router-dom";
import { buttonVariants } from "./ui/button";
import Logout from "./Auth/Logout";
import { SunIcon } from "@radix-ui/react-icons";

type Props = {};

export default function Navbar({}: Props) {
  return (
    <NavbarUI shouldHideOnScroll>
      <NavbarBrand>
        <Link to="/" className="font-bold text-3xl text-inherit">
          ACME
        </Link>
      </NavbarBrand>

      <NavbarContent justify="end" className="items-center">
        <Tooltip
          content="View Todos"
          closeDelay={50}
          color="foreground"
          classNames={{
            base: "py-2 px-4 shadow-xl rounded-lg",
          }}
        >
          <NavbarItem isActive>
            <NavLink
              to="/dashboard"
              className={buttonVariants({ variant: "ghost", size: "icon" })}
              
            >
              <div className="flex gap-1.5 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
                  />
                </svg>
              </div>
            </NavLink>
          </NavbarItem>
        </Tooltip>
        <NavbarItem
          className={buttonVariants({ variant: "ghost", size: "icon" })}
        >
          <SunIcon />
        </NavbarItem>
        <NavbarItem className="flex">
          <Logout />
        </NavbarItem>
      </NavbarContent>
    </NavbarUI>
  );
}
