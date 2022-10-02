import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
// App
import App from "./App";
// Styles
import "assets/css/tailwind.css";
import "assets/scss/styles.scss";
import { Canvas } from "@react-three/fiber";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <div className="fixed w-screen h-screen bg-body text-default overflow-hidden cursor-grab active:cursor-grabbing">
      <Canvas>
        <Suspense fallback={null}>
          <App />
        </Suspense>
      </Canvas>
    </div>
  </React.StrictMode>
);
