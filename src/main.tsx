import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./styles/globals.css";
import "./index.css";

// Hide loader once React is ready
const loader = document.getElementById("app-loader");
if (loader) {
  // Wait for next tick to ensure React has mounted
  requestAnimationFrame(() => {
    loader.classList.add("loaded");
    setTimeout(() => loader.remove(), 300);
  });
}

createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>
);
