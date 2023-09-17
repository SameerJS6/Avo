import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { toast } from "../ui/use-toast";
import { Button, buttonVariants } from "../ui/button";
import { Spinner } from "@nextui-org/react";

type Props = {};

export default function Logout({}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const handleStatus = async () => {
    try {
      setIsLoading(true);
      await logout();
      navigate("/login");
      setIsLoading(false);
      toast({
        title: "Successfully Logged Out!!!",
        description: "You have Successfully Logged out your Account",
      });
    } catch (err: any) {
      setIsLoading(false);
      console.log(err.code);
    }
  };
  return (
    // Log In Button
    <>
      {!currentUser && (
        <Link to="/login" className={buttonVariants({ variant: "default" })}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 mr-1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
            />
          </svg>
          Log In
        </Link>
      )}
      {/* Log Out Button  */}
      {currentUser && (
        <Button
          disabled={isLoading}
          onClick={handleStatus}
          variant="outline"
          className="gap-2"
        >
          {isLoading ? (
            <Spinner size="sm" color="default" />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
          )}
          {isLoading ? "Logging Out..." : "Log Out"}
        </Button>
      )}
    </>
  );
}
