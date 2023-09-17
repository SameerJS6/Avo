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
} from "react";
import { useAuth } from "./AuthContext";

interface NoteContextTypes {
  todos: [] | TodoTypes[];
  setTodos: Dispatch<React.SetStateAction<[] | TodoTypes[]>>;

  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<React.SetStateAction<boolean>>;
  noteTitle: string;
  setNoteTitle: Dispatch<React.SetStateAction<string>>;
  noteDescription: string;
  setNoteDescription: Dispatch<React.SetStateAction<string>>;
  isCompleted: boolean;
  setIsCompleted: Dispatch<React.SetStateAction<boolean>>;
  isEditing: boolean;
  setIsEditing: Dispatch<React.SetStateAction<boolean>>;
  editingTodo: [] | TodoTypes[];
  setEditingTodo: Dispatch<React.SetStateAction<[] | TodoTypes[]>>;

  createTodo: () => Promise<void>;
  removeTodo: (id: string) => Promise<void>;
  editTodo: () => Promise<void>;
  handleEditDialog: (id: string) => void;
  isTodoFetching: boolean;
}

type TodoTypes = {
  id: string;
  title?: string;
  description?: string;
  completed?: boolean;
};

type NotesProviderProps = {
  children: ReactNode;
};

const NotesContext = createContext({} as NoteContextTypes);

const NotesProvider = ({ children }: NotesProviderProps) => {
  const [todos, setTodos] = useState<TodoTypes[] | []>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDescription, setNoteDescription] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isTodoFetching, setIsTodoFetching] = useState(false);
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
      setIsTodoFetching(true);
      const unsubsribe = onSnapshot(todosCollectionRef, (snapshot) => {
        const filteredData = snapshot.docs.map((dos) => ({
          ...dos.data(),
          id: dos.id,
        }));
        setTodos(filteredData);
        setIsTodoFetching(false);
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

      console.log(currentUser?.uid);
      return unsubsribe;
    }
  }, [userId]);

  // Create Todo Function
  const createTodo = async () => {
    try {
      await addDoc(todosCollectionRef, {
        title: noteTitle,
        description: noteDescription,
        isCompleted: isCompleted,
        userId: currentUser?.uid,
      });
      toast({
        title: "Todo Created!!!",
        description: "You have successfully created a todo",
      });
      setIsDialogOpen(false);
      setNoteTitle("");
      setNoteDescription("");
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
    setIsEditing(true);
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
      setIsEditing(!isEditing);
    } catch (err: any) {
      console.log(err.code, err.message);
    }
  };

  return (
    <NotesContext.Provider
      value={{
        todos,
        setTodos,
        isDialogOpen,
        setIsDialogOpen,
        noteTitle,
        setNoteTitle,
        noteDescription,
        setNoteDescription,
        isCompleted,
        setIsCompleted,
        removeTodo,
        createTodo,
        editTodo,
        isEditing,
        setIsEditing,
        handleEditDialog,
        editingTodo,
        setEditingTodo,
        isTodoFetching,
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
