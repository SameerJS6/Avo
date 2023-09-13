import { Route, Routes } from "react-router-dom";
import { Button } from "./components/ui/button";
import { Toaster } from "./components/ui/toaster";
import { toast } from "./components/ui/use-toast";

type Props = {};

export default function App({}: Props) {
  return (
    <main className="grid min-h-screen place-content-center">
      {/* Hello World */}
      <Button
        onClick={() => {
          toast({
            title: "Scheduled: Catch up",
            description: "Friday, February 10, 2023 at 5:57 PM",
          });
        }}
      >
        Hello World
      </Button>
      <Toaster />
    </main>
  );
}
