import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Google from "../assets/Google.png";

type Props = {};

export default function GoogleSignIn({}: Props) {
  const { googleSignIn } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      navigate("/account");
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      console.error(message);
    }
  };

  return (
    <button onClick={handleGoogleSignIn} className="btn btn-primary">
      <img className="w-6 mix-blend-screen" src={Google} alt="Google Icon" />
      Google
    </button>
  );
}
