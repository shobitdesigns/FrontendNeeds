import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import 'react-range-slider-input/dist/style.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { registerSW } from "virtual:pwa-register";
import { CartProvider } from "./components/Contexts/CartContext";
import { CompareProvider } from "./components/Contexts/AddToCompare";
import { WishlistProvider } from "./components/Contexts/WishlistContext";
if (import.meta.env.MODE === "production") {
  registerSW();
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <CartProvider>
      <CompareProvider>
      <WishlistProvider>
        <App />
      </WishlistProvider>
      </CompareProvider>
    </CartProvider>
  </React.StrictMode>
);

AOS.init();
