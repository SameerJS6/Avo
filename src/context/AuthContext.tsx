import { Dispatch, createContext, useContext, useState } from "react";
import { auth } from "../Firebase/FirebaseConfig";
import { UserCredential, createUserWithEmailAndPassword } from "firebase/auth";

type AuthProviderProps = {
  children: React.ReactNode;
};

type ShowAlertType = {
  show: boolean;
  type: string;
  message: string;
};

type AuthContextProps = {
  currentUser: string;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  showAlert: ShowAlertType;
  setShowAlert: Dispatch<React.SetStateAction<ShowAlertType>>;
};

const AuthContext = createContext({} as AuthContextProps);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState("");
  const [showAlert, setShowAlert] = useState({
    show: false,
    type: "",
    message: "",
  });

  const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, signUp, showAlert, setShowAlert }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
