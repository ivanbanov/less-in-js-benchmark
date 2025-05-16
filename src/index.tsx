import React from "react";
import ReactDOM from "react-dom/client";
import { Benchmark } from "./benchmark";
import "./styles.less";

const App = () => (
  <>
    <h1>Benchmark</h1>
    <Benchmark />
  </>
);

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
