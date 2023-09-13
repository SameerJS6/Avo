import { useState, FormEvent } from "react";
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
import { useAuth } from "@/context/AuthContext";
import { toast } from "../ui/use-toast";
import { Link, useNavigate } from "react-router-dom";

type Props = {};

export default function Signup({}: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const { signUp, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password || !passwordConfirmation) {
      return toast({
        variant: "destructive",
        title: "Information Required!!",
        description: "Required Information is Empty",
      });
    }

    if (password !== passwordConfirmation) {
      return toast({
        variant: "destructive",
        title: "Password Does Not Match!!",
        description: "You've Entered Wrong Password",
      });
    }

    try {
      await signUp(email, password);
      console.log(currentUser);
      navigate("/account");
      toast({
        title: "Successfully Logged In",
        description: "You have Successfully Created Your Account",
      });
    } catch (err: any) {
      console.error(err.code, err.message);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold tracking-tight">
          Create an account
        </CardTitle>
        <CardDescription className="leading-4">
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full gap-4 items-center">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                placeholder="Enter your Email"
                id="email"
                value={email}
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
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="passwordConfirmation">
                Password Confirmation
              </Label>
              <Input
                type="text"
                placeholder="Confirm your Password"
                id="passwordConfirmation"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
            </div>
            <Button size="lg" className="w-full">
              <Link to="/account">Sign Up</Link>
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <CardDescription>
          Already have an Account!
          <Button variant="link" className="p-0 ml-1">
            <Link to="/login">Log In</Link>
          </Button>
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
