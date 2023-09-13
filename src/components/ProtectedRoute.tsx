import { useAuth } from "@/context/AuthContext";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type ProtectRouteProps = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectRouteProps) {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
