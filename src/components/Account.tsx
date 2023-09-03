import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { User } from "firebase/auth";

type Props = {};

export default function Account({}: Props) {
  const { user, logOut, setShowAlert } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      setShowAlert({
        show: true,
        type: "success",
        message: "Account Logged Out Successfully",
      });
      navigate("/");
      console.log("Logged Out Successfully");
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      console.error(message);
    }
  };

  const isFunction = (obj: any): obj is () => User => {
    return typeof obj === "function";
  };

  return (
    <>
      <div className="text-7xl px-32 py-16 font-medium">Account</div>;
      <div className="space-y-12 px-32 font-medium">
        <h2 className="text-2xl px-4">
          Email: {user && !isFunction(user) ? user.email : "Not Logged In"}
        </h2>
        <button onClick={handleLogout} className="btn btn-primary">
          Log Out
        </button>
      </div>
    </>
  );
}
