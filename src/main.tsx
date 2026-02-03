// Polyfills must be imported first
import { Buffer } from 'buffer';
window.Buffer = Buffer;
(window as any).global = window;
(window as any).process = { env: {}, version: '', browser: true };

import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
