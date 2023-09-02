import { useRef } from "react";
import { Link } from "react-router-dom";
type Props = {};

export default function Login({}: Props) {
  let usernameRef = useRef(null);
  let passwordRef = useRef(null);
  return (
    <main className="grid place-content-center min-h-screen">
      <div className="card w-[500px] shadow-md hover:shadow-lg">
        <div className="card-body bg-base-200 bg-opacity-50 rounded-lg gap-8">
          <div className="space-y-4">
            <h2 className="font-medium text-5xl">Login</h2>
            <p className="text-sm">Welcome back! Please enter your details</p>
          </div>

          <form className="form-control w-full max-w-lg">
            <label htmlFor="username" className="label">
              <span className="label-text">Username or E-mail</span>
            </label>
            <input
              type="email"
              ref={usernameRef}
              id="username"
              placeholder="Enter Your Username"
              className="input input-bordered w-full max-w-lg"
            />

            <label htmlFor="password" className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              ref={passwordRef}
              id="password"
              placeholder="Enter Your Password"
              className="input input-bordered w-full max-w-lg"
            />
          </form>

          <div className="card-actions mt-4">
            <button className="btn btn-block tracking-wider btn-primary">
              Log I n
            </button>
          </div>
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
