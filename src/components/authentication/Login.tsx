import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
type Props = {};

export default function Login({}: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { setShowAlert, logIn } = useAuth();

  const handleLogIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await logIn(username, password);
      setShowAlert({
        show: true,
        type: "success",
        message: "Account Logged In Successfully",
      });
      navigate("/account");
      console.log("Logged In");
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      console.error(message);
    }
  };
  return (
    <main className="grid place-content-center min-h-screen">
      <div className="card w-[500px] shadow-md hover:shadow-lg">
        <div className="card-body bg-base-200 bg-opacity-50 rounded-lg gap-8">
          <div className="space-y-4">
            <h2 className="font-medium text-5xl">Login</h2>
            <p className="text-sm">Welcome back! Please enter your details</p>
          </div>

          <form onSubmit={handleLogIn} className="form-control w-full max-w-lg">
            <label htmlFor="username" className="label">
              <span className="label-text">Username or E-mail</span>
            </label>
            <input
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="username"
              required
              autoFocus
              placeholder="Enter Your Username"
              className="input input-bordered w-full max-w-lg"
            />

            <label htmlFor="password" className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              required
              placeholder="Enter Your Password"
              className="input input-bordered w-full max-w-lg"
            />

            <button className="mt-8 btn btn-block tracking-wider btn-primary">
              Log In
            </button>
          </form>

          {/* <div className="card-actions mt-4"></div> */}
          <div className="text-center">
            <p className="text-base-content text-opacity-60">
              Don't have an account?{" "}
              <Link
                to={"/signup"}
                className="text-base-content transition-all duration-300 ease-in-out hover:underline underline-offset-2 text-opacity-80 hover:text-opacity-100 font-medium"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
