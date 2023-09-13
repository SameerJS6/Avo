import { Link, useNavigate } from "react-router-dom";
import { Button, buttonVariants } from "./ui/button";
import { useAuth } from "@/context/AuthContext";
import { toast } from "./ui/use-toast";

type Props = {};

export default function Account({}: Props) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      toast({
        title: "Successfully Logged Out!!",
        description: "You have Successfully Logged out you Account",
      });
    } catch (err: any) {
      console.log(err.code, err.message);
    }
  };
  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight">Account</h1>
      <div className="flex items-center gap-4">
        <Link
          className={buttonVariants({ variant: "default", size: "lg" })}
          to="/"
        >
          Home
        </Link>
        <Link
          className={buttonVariants({ variant: "default", size: "lg" })}
          to="/account"
        >
          Account
        </Link>
        <Button onClick={handleLogout} variant="outline" size="lg">
          Log Out
        </Button>
      </div>
    </>
  );
}
