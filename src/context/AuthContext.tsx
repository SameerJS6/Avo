import {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "../Firebase/FirebaseConfig";
import {
  GoogleAuthProvider,
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from "firebase/auth";

type AuthProviderProps = {
  children: React.ReactNode;
};

type ShowAlertType = {
  show: boolean;
  type: string;
  message: string;
};

type AuthContextProps = {
  user: User | (() => User) | null;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  showAlert: ShowAlertType;
  setShowAlert: Dispatch<React.SetStateAction<ShowAlertType>>;
  logOut: () => Promise<void>;
  logIn: (email: string, password: string) => Promise<UserCredential>;
  googleSignIn: () => Promise<UserCredential>;
};

const AuthContext = createContext({} as AuthContextProps);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | (() => User) | null>(null);
  const [showAlert, setShowAlert] = useState({
    show: false,
    type: "",
    message: "",
  });

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setUser(currentUser);
      console.log(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setShowAlert({ ...showAlert, show: false });
    }, 1000);

    return () => clearTimeout(timeout);
  }, [showAlert]);

  return (
    <AuthContext.Provider
      value={{
        user,
        signUp,
        showAlert,
        setShowAlert,
        logOut,
        logIn,
        googleSignIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
