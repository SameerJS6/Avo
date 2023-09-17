import { Button } from "../ui/button";
import GoogleLogo from "../../assets/Google.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "../ui/use-toast";
import { useState } from "react";
import { Spinner } from "@nextui-org/spinner";

type Props = {};

export default function GoogleSignIn({}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { loginWithGoogle } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      await loginWithGoogle();
      navigate("/dashboard");
      setIsLoading(false);
      toast({
        title: "Successfully Logged In With Google Account",
        description: "You have Successfully Logged in you Account",
      });
    } catch (err: any) {
      console.log(err.code, err.message);
      setIsLoading(false);
      if (err.code === "auth/popup-closed-by-user") {
        toast({
          variant: "destructive",
          title: "Failed to Logged In",
          description: "You've Closed the Sign In Popup Window",
        });
      }
    }
  };
  return (
    <Button
      disabled={isLoading}
      onClick={handleGoogleLogin}
      className="w-full gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      variant="outline"
      size="lg"
    >
      {isLoading ? (
        <Spinner size="sm" />
      ) : (
        <img className="w-5" src={GoogleLogo} alt="Google Sign Logo" />
      )}
      Google
    </Button>
  );
}
