import { Button } from "../ui/button";
import GoogleLogo from "../../assets/Google.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "../ui/use-toast";

type Props = {};

export default function GoogleSignIn({}: Props) {
  const navigate = useNavigate();
  const { loginWithGoogle } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate("/account");
      toast({
        title: "Successfully Logged In With Google Account",
        description: "You have Successfully Logged in you Account",
      });
    } catch (err: any) {
      console.log(err.code, err.message);
      toast({
        variant: "destructive",
        title: "Failed to Logged In",
        description: err.message,
      });
    }
  };
  return (
    <Button
      onClick={handleGoogleLogin}
      className="w-full gap-2 "
      variant="outline"
      size="lg"
    >
      <img className="w-5" src={GoogleLogo} alt="Google Sign Logo" />
      Google
    </Button>
  );
}
