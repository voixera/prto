import { profile } from "./profile";

export const NAV_ITEMS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

export const STACK_GROUPS = [
  {
    id: "frontend",
    label: "Frontend",
    items: ["HTML", "CSS", "React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "backend",
    label: "Backend",
    items: ["Node.js", "PHP", "SQL", "MongoDB", "Discord.js"],
  },
  {
    id: "systems",
    label: "Systems & Tools",
    items: ["Lua", "Vercel", "Git", "Three.js", "GSAP"],
  },
];

export const WEB_PROJECTS = profile.projects.filter(
  (project) =>
    !project.title.toLowerCase().includes("discord") &&
    !project.title.toLowerCase().includes("roblox")
);

export const DISCORD_PROJECT = profile.projects.find((project) =>
  project.title.toLowerCase().includes("discord")
);

export const ROBLOX_PROJECT = profile.projects.find((project) =>
  project.title.toLowerCase().includes("roblox")
);

export const ABOUT_META = [
  { label: "Based in", value: profile.location },
  { label: "Focus", value: "Web, bots, Lua tools" },
  { label: "Stack", value: "React · Node.js · Lua" },
  { label: "Currently", value: "Building interfaces and Discord systems" },
];

export function isExternalHref(href = "") {
  return href.startsWith("http") || href.startsWith("mailto:");
}

export function discordUsername() {
  return profile.discordHandle.replace(/^@/, "");
}
