import { useState } from "react";
import Home from "./Pages/Home";
import WelcomeScreen from "./Pages/WelcomeScreen";

export default function App() {
  const [entered, setEntered] = useState(false);

  return (
    <>
      {!entered && <WelcomeScreen entered={entered} onEnter={() => setEntered(true)} />}
      <Home entered={entered} />
    </>
  );
}
