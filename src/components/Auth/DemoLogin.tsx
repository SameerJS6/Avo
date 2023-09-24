import { Dispatch } from "react";
import { Button } from "../ui/button";
import { Spinner } from "@nextui-org/react";
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { ToastAction } from "../ui/toast";
import { toast } from "../ui/use-toast";

type DemoLoginProps = {
  setIsLoading: Dispatch<React.SetStateAction<boolean>>;
  setEmail: Dispatch<React.SetStateAction<string>>;
  setPassword: Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
};

export default function DemoLogin({
  setIsLoading,
  setEmail,
  setPassword,
  isLoading,
}: DemoLoginProps) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const Email: string = "test@test.com";
  const Password: string = "Password";
  const handleDemoLogin = async () => {
    try {
      setIsLoading(true);
      setEmail(Email);
      setPassword(Password);
      await login(Email, Password);
      navigate("/dashboard");
      setIsLoading(false);
      toast({
        title: "Successfully Logged In!!!",
        description: "You have Successfully Logged in with Demo Account",
      });
    } catch (err: any) {
      if (err.code === "auth/user-not-found") {
        setIsLoading(false);
        toast({
          variant: "destructive",
          title: "Failed To Logged In!!",
          description: "Account Does Not Exits",
          action: (
            <ToastAction altText="Create a Account">
              <Link to="/signup">Create a Account</Link>
            </ToastAction>
          ),
        });
      }
    }
  };
  return (
    <Button
      disabled={isLoading}
      variant="secondary"
      onClick={handleDemoLogin}
      className="w-full disabled:opacity-50 disabled:cursor-not-allowed gap-2 "
    >
      {isLoading ? <Spinner size="sm" color="default" /> : null}
      {isLoading ? "" : "Test it out"}
    </Button>
  );
}
