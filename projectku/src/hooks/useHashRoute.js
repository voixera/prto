import { useEffect, useState } from "react";

export default function useHashRoute() {
  const [hash, setHash] = useState(() =>
    typeof window === "undefined" ? "" : window.location.hash
  );

  useEffect(() => {
    const onChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  if (hash.startsWith("#/discord-bots")) return "discord-bots";
  if (hash.startsWith("#/roblox-scripts")) return "roblox-scripts";
  return "home";
}
