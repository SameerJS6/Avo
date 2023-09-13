import { FormEvent, useState } from "react";
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
import GoogleLogo from "../../assets/Google.png";
import { Separator } from "../ui/separator";
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "../ui/use-toast";

type Props = {};

export default function Login({}: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      await login(email, password);
      console.log(currentUser);
      toast({
        title: "Successfully Logged In",
        description: "You have Successfully Logged in you Account",
      });
      navigate("/account");
    } catch (err: any) {
      console.error(err.message, err.code);
    }
  };
  return (
    <>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Log In
          </CardTitle>
          <CardDescription className="leading-4">
            Log In Your Account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full gap-2 " variant="outline" size="lg">
            <img className="w-5" src={GoogleLogo} alt="Google Sign Logo" />
            Google
          </Button>
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
              <Button className="w-full">Log In</Button>
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
    </>
  );
}
