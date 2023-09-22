import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.tsx";
import { NotesProvider } from "./context/NotesContext.tsx";
import { ThemeProvider } from "./context/ThemeContent.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <NextUIProvider>
          <AuthProvider>
            <NotesProvider>
              <App />
            </NotesProvider>
          </AuthProvider>
        </NextUIProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
