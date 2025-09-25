import { createRoot } from "react-dom/client";
import ThemedApp from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<ThemedApp />);