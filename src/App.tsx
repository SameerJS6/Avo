import { Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import { Toaster } from "./components/ui/toaster";
import ProtectedRoute from "./components/ProtectedRoute";
import Account from "./components/Account";

type Props = {};

export default function App({}: Props) {
  return (
    <main className="grid place-content-center min-h-screen">
      <Routes>
        <Route path="/" element={<h1>Hello World</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster />
    </main>
  );
}
