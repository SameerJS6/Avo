import { db } from "@/Service/FirebaseConfig";
import { toast } from "@/components/ui/use-toast";
import {
  deleteDoc,
  doc,
  getDocs,
  collection,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import {
  ReactNode,
  createContext,
  useContext,
  useState,
  Dispatch,
  useEffect,
} from "react";

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

  getTodosCollection: () => Promise<void>;
  createTodo: () => Promise<void>;
  removeTodo: (id: string) => Promise<void>;
  editTodo: () => Promise<void>;
  handleEditDialog: (id: string) => void;
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
  const [editingTodo, setEditingTodo] = useState<TodoTypes[] | []>([]);

  const todosCollectionRef = collection(db, "todos");

  const getTodosCollection = async () => {
    try {
      const data = await getDocs(todosCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTodos(filteredData);
    } catch (err: any) {
      console.log(err.code, err.message);
    }
  };

  const createTodo = async () => {
    try {
      await addDoc(todosCollectionRef, {
        title: noteTitle,
        description: noteDescription,
        isCompleted: isCompleted,
      });
      getTodosCollection();
      setIsDialogOpen(false);
      setNoteTitle("");
      setNoteDescription("");
    } catch (err: any) {
      console.log(err.code, err.message);
    }
  };

  const removeTodo = async (id: string) => {
    try {
      const todo = doc(db, "todos", id);
      await deleteDoc(todo);
      toast({
        title: "Todo Removed!!!",
        description: "You have successfully removed a todo",
      });
      getTodosCollection();
    } catch (err: any) {
      console.log(err.code, err.message);
    }
  };

  const handleEditDialog = (id: string) => {
      const currentTodo = todos.filter((todo) => todo.id === id);
      setEditingTodo(currentTodo)
      setIsEditing(true)
    };

  const editTodo = async () => {
    const todoToEdit = editingTodo[0]
    const todo = doc(db, "todos", todoToEdit.id);
    try {
      await updateDoc(todo, {
        title: todoToEdit.title,
        description: todoToEdit.description,
      });
      getTodosCollection();
      setIsEditing(!isEditing)
      toast({
        title: "Todo Updated!!!",
        description: "You have successfully updated a todo",
      });
    } catch (err: any) {
      console.log(err.code, err.message);
    }
  }


  useEffect(() => {
    getTodosCollection();
  }, []);

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
        getTodosCollection,
        editTodo,
        isEditing,
        setIsEditing,
        handleEditDialog,
        editingTodo,
        setEditingTodo
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
