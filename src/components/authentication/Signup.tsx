import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

type Props = {};

export default function Signup({}: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { signUp, setShowAlert } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await signUp(username, password);
      setShowAlert({
        show: true,
        type: "success",
        message: "Account Created Successfully",
      });
      navigate("/account");
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      console.error(message);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log("Error");

      setShowAlert({
        show: true,
        type: "error",
        message: "passwords do not match",
      });
      return;
    }
    handleSignup();
  };

 
  return (
    <>
      <main className="grid place-content-center min-h-screen">
        <div className="card w-[500px] shadow-md hover:shadow-lg">
          <div className="card-body bg-base-200 bg-opacity-50 rounded-lg gap-8">
            <h2 className="font-medium text-5xl">Sign Up</h2>

            <form
              onSubmit={handleSubmit}
              className="form-control w-full max-w-lg"
            >
              <label htmlFor="username" className="label">
                <span className="label-text">Username or E-mail</span>
              </label>
              <input
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
                id="username"
                required
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

              <label htmlFor="confirmPassword" className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                id="confirmPassword"
                required
                placeholder="Confirm Your Password"
                className="input input-bordered w-full max-w-lg"
              />

              <button className="mt-8 btn btn-block tracking-wider btn-primary">
                Sign Up
              </button>
            </form>

            {/* <div className="card-actions mt-4">
            </div> */}
            <div className="text-center">
              <p className="text-base-content text-opacity-60">
                Already have an account?{" "}
                <Link
                  to={"/login"}
                  className="text-base-content transition-all duration-300 ease-in-out hover:underline underline-offset-2 text-opacity-80 hover:text-opacity-100 font-medium"
                >
                  Log In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
