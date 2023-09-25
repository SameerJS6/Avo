import { db } from "@/Service/FirebaseConfig";
import { toast } from "@/components/ui/use-toast";
import {
  deleteDoc,
  doc,
  collection,
  addDoc,
  updateDoc,
  onSnapshot,
  CollectionReference,
  DocumentData,
} from "firebase/firestore";
import {
  ReactNode,
  createContext,
  useContext,
  useState,
  Dispatch,
  useEffect,
  ChangeEvent,
} from "react";
import { useAuth } from "./AuthContext";

interface NoteContextTypes {
  // Todos Types
  todos: [] | TodoTypes[];
  todosBackup: [] | TodoTypes[];
  todoDetails: TodoDetailsTypes;
  setTodos: Dispatch<React.SetStateAction<[] | TodoTypes[]>>;
  handleTodoDetails: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  // Loading
  isWaiting: isWaitingTypes;
  setIsWaiting: Dispatch<React.SetStateAction<isWaitingTypes>>;
  // Editing
  editingTodo: [] | TodoTypes[];
  setEditingTodo: Dispatch<React.SetStateAction<[] | TodoTypes[]>>;
  // CRUD Functions
  editTodo: () => Promise<void>;
  createTodo: () => Promise<void>;
  removeTodo: (id: string) => Promise<void>;
  handleEditDialog: (id: string) => void;
  updateComplete: (
    id: string,
    e: ChangeEvent<HTMLInputElement>
  ) => Promise<void>;
}

type TodoTypes = {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
};

type TodoDetailsTypes = {
  title: string;
  description: string;
  isCompleted?: boolean;
};

type isWaitingTypes = {
  isDialogOpen: boolean;
  isEditing: boolean;
  isTodoFetching: boolean;
};

type NotesProviderProps = {
  children: ReactNode;
};

const NotesContext = createContext({} as NoteContextTypes);

const NotesProvider = ({ children }: NotesProviderProps) => {
  const [todos, setTodos] = useState<TodoTypes[] | []>([]);
  const [todosBackup, setTodosBackup] = useState<TodoTypes[] | []>([]);
  const [todoDetails, setTodoDetails] = useState({} as TodoDetailsTypes);
  const [isWaiting, setIsWaiting] = useState<isWaitingTypes>({
    isDialogOpen: false,
    isEditing: false,
    isTodoFetching: false,
  });
  const [editingTodo, setEditingTodo] = useState<TodoTypes[] | []>([]);

  const { currentUser } = useAuth();
  let userId: string | undefined;

  if (currentUser && currentUser?.uid) {
    userId = currentUser.uid;
  } else {
    userId = "";
  }

  let todosCollectionRef: CollectionReference<DocumentData, DocumentData>;
  if (userId) {
    todosCollectionRef = collection(db, "todos", userId, "documents");
  }

  useEffect(() => {
    if (userId) {
      setIsWaiting((prevIsWaiting) => ({
        ...prevIsWaiting,
        isTodoFetching: true,
      }));
      const unsubsribe = onSnapshot(todosCollectionRef, (snapshot) => {
        const filteredData: TodoTypes[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title || "",
          description: doc.data().description || "",
          isCompleted: doc.data().isCompleted || false,
        }));
        setTodos(filteredData);
        setTodosBackup(filteredData);
        setIsWaiting((prevIsWaiting) => ({
          ...prevIsWaiting,
          isTodoFetching: false,
        }));
        snapshot.docChanges().map((change) => {
          if (change.type === "modified") {
            toast({
              title: "Todo Updated!!!",
              description: "You have successfully updated a todo",
            });
          }
          if (change.type === "removed") {
            toast({
              title: "Todo Removed!!!",
              description: "You have successfully removed a todo",
            });
          }
        });
      });

      return unsubsribe;
    }
  }, [userId]);

  // Create Todo Function
  const createTodo = async () => {
    try {
      await addDoc(todosCollectionRef, {
        title: todoDetails.title,
        description: todoDetails.description,
        isCompleted: false,
      });
      toast({
        title: "Todo Created!!!",
        description: "You have successfully created a todo",
      });

      setIsWaiting((prevIsWaiting) => ({
        ...prevIsWaiting,
        isDialogOpen: false,
      }));

      setTodoDetails({ title: "", description: "" });
    } catch (err: any) {
      console.log(err.code, err.message);
    }
  };

  // Remove or Delete Todo
  const removeTodo = async (id: string) => {
    try {
      const todo = doc(db, "todos", userId!, "documents", id);
      await deleteDoc(todo);
    } catch (err: any) {
      console.log(err.code, err.message);
    }
  };
  // Select the Editing Todo Fucntion
  const handleEditDialog = (id: string) => {
    const currentTodo = todos.filter((todo) => todo.id === id);
    setEditingTodo(currentTodo);
    setIsWaiting((prevIsWaiting) => ({
      ...prevIsWaiting,
      isEditing: true,
    }));
  };
  // Editing Todo Function
  const editTodo = async () => {
    const todoToEdit = editingTodo[0];
    const todo = doc(db, "todos", userId!, "documents", todoToEdit.id);
    try {
      await updateDoc(todo, {
        title: todoToEdit.title,
        description: todoToEdit.description,
      });
      setIsWaiting((prevIsWaiting) => ({
        ...prevIsWaiting,
        isEditing: false,
      }));
    } catch (err: any) {
      console.log(err.code, err.message);
    }
  };

  // Edit Complete Function
  const updateComplete = async (
    id: string,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    // const currentTodo = todos.filter((todo) => todo.id === id);
    const todo = doc(db, "todos", userId!, "documents", id);
    try {
      await updateDoc(todo, {
        isCompleted: e.target.checked,
      });
    } catch (err: any) {
      console.log(err.code, err.message);
    }
  };

  // Updating Input Value Function
  const handleTodoDetails = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTodoDetails((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <NotesContext.Provider
      value={{
        todos,
        todosBackup,
        todoDetails,
        editingTodo,
        isWaiting,
        removeTodo,
        createTodo,
        editTodo,
        setIsWaiting,
        setTodos,
        handleEditDialog,
        setEditingTodo,
        updateComplete,
        handleTodoDetails,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

const useNotes = () => {
  return useContext(NotesContext);
};

export { NotesProvider, useNotes };
