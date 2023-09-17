import { FormEvent, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "../ui/use-toast";
import GoogleSignIn from "./GoogleSignIn";
import { ToastAction } from "../ui/toast";
import { Spinner } from "@nextui-org/react";

type Props = {};

export default function Login({}: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      return toast({
        variant: "destructive",
        title: "Information Required!!",
        description: "Required Information is Empty",
      });
    }

    try {
      setIsLoading(true);
      await login(email, password);
      toast({
        title: "Successfully Logged In!!!",
        description: "You have Successfully Logged in you Account",
      });
      setIsLoading(false);
      navigate("/dashboard");
    } catch (err: any) {
      setIsLoading(false);
      if (err.code === "auth/wrong-password") {
        toast({
          variant: "destructive",
          title: "Failed To Logged In!!",
          description: "Please Enter the Correct Password",
        });
      }
      if (err.code === "auth/user-not-found") {
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

  useEffect(() => {
    if (currentUser) {
      return navigate("/dashboard");
    }
  }, [currentUser]);

  return (
    <>
      <main className="centered">
        <Card className="modalWidth">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold tracking-tight">
              Log In
            </CardTitle>
            <CardDescription className="leading-4">
              Log In Your Account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <GoogleSignIn />
            <Separator className="my-5" />
            <form onSubmit={handleSubmit}>
              <div className="grid w-full gap-4 items-center">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    placeholder="Enter your Email"
                    id="email"
                    value={email}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    placeholder="Enter your Password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button
                  disabled={isLoading}
                  className="w-full disabled:opacity-50 disabled:cursor-not-allowed gap-2"
                >
                  {isLoading ? <Spinner size="sm" color="default" /> : null}
                  {isLoading ? "Logging In..." : "Log In"}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <CardDescription>
              Don't have an Account?{" "}
              <Button variant="link" className="p-0">
                <Link to="/signup">Sign Up</Link>
              </Button>
            </CardDescription>
          </CardFooter>
        </Card>
      </main>
    </>
  );
}
