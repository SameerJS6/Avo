import { useRef } from "react";

type Props = {};

export default function Signup({}: Props) {
  let usernameRef = useRef(null);
  let passwordRef = useRef(null);
  let confirmPasswordRef = useRef(null);
  return (
    <>
      <main className="grid place-content-center min-h-screen">
        <div className="card w-[500px] shadow-md hover:shadow-lg">
          <div className="card-body bg-base-200 bg-opacity-50 rounded-lg gap-8">
            <h2 className="font-medium text-5xl">Sign Up</h2>

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

              <label htmlFor="confirmPassword" className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                ref={confirmPasswordRef}
                id="confirmPassword"
                placeholder="Confirm Your Password"
                className="input input-bordered w-full max-w-lg"
              />
            </form>

            <div className="card-actions mt-4">
              <button className="btn btn-block tracking-wider btn-primary">
                Log In
              </button>
            </div>
            <div className="text-center">
              <p className="text-base-content text-opacity-60">
                Already have an account?{" "}
                <button className="text-base-content transition-all duration-300 ease-in-out hover:underline underline-offset-2 text-opacity-80 hover:text-opacity-100 font-medium">
                  Sign Up
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
