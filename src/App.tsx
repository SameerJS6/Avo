import { Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import { Toaster } from "./components/ui/toaster";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import CreateTodo from "./pages/CreateTodo";
import Navbar from "./components/Navbar";
import RecycleBin from "./pages/RecycleBin";

type Props = {};

export default function App({}: Props) {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Hello World</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
              <CreateTodo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trash"
          element={
            <ProtectedRoute>
              <RecycleBin />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster />
    </>
  );
}
