import { profile } from "./profile";

import vercelImg from "../assets/tech-stack/vercel.jpg";
import typescriptImg from "../assets/tech-stack/typescript.jpg";
import threejsImg from "../assets/tech-stack/threejs.jpg";
import tailwindcssImg from "../assets/tech-stack/tailwindcss.png";
import sqlImg from "../assets/tech-stack/sql.jpg";
import reactImg from "../assets/tech-stack/react.png";
import phpImg from "../assets/tech-stack/php.png";
import nodejsImg from "../assets/tech-stack/nodejs.jpg";
import nextjsImg from "../assets/tech-stack/nextjs.jpg";
import mongodbImg from "../assets/tech-stack/mongodb.jpg";
import luaImg from "../assets/tech-stack/lua.jpg";
import htmlImg from "../assets/tech-stack/html.jpg";
import gitImg from "../assets/tech-stack/git.jpg";
import cssImg from "../assets/tech-stack/css.jpg";

export const TECH_ASSETS = {
  "HTML": htmlImg,
  "CSS": cssImg,
  "React": reactImg,
  "Next.js": nextjsImg,
  "TypeScript": typescriptImg,
  "Tailwind CSS": tailwindcssImg,
  "Node.js": nodejsImg,
  "PHP": phpImg,
  "SQL": sqlImg,
  "MongoDB": mongodbImg,
  "Discord.js": nodejsImg,
  "Lua": luaImg,
  "Vercel": vercelImg,
  "Three.js": threejsImg,
  "Git": gitImg,
};

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
    items: ["Lua", "Vercel"],
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
