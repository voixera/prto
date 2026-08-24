import { useEffect, useState } from "react";
import Home from "./Pages/Home";
import WelcomeScreen from "./Pages/WelcomeScreen";
import DiscordBots from "./Pages/DiscordBots";
import RobloxScripts from "./Pages/RobloxScripts";
import useHashRoute from "./hooks/useHashRoute";
import LenisProvider from "./components/LenisProvider";
import useReducedMotion from "./hooks/useReducedMotion";

export default function App() {
  const route = useHashRoute();
  const reduced = useReducedMotion();
  const [entered, setEntered] = useState(route !== "home");

  useEffect(() => {
    if (route !== "home") setEntered(true);
  }, [route]);

  useEffect(() => {
    if (route !== "home") window.scrollTo(0, 0);
  }, [route]);

  return (
    <LenisProvider enabled={!reduced && entered && route === "home"}>
      {route === "home" && !entered ? (
        <WelcomeScreen entered={entered} onEnter={() => setEntered(true)} />
      ) : null}
      {route === "home" ? <Home entered={entered} /> : null}
      {route === "discord-bots" ? <DiscordBots /> : null}
      {route === "roblox-scripts" ? <RobloxScripts /> : null}
    </LenisProvider>
  );
}
