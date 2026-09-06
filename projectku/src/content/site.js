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
  "JavaScript": "https://cdn.simpleicons.org/javascript/F7DF1E",
  "Vue.js": "https://cdn.simpleicons.org/vuedotjs/4FC08D",
  "PowerShell": "https://cdn.simpleicons.org/powershell/5391FE",
  "Python": "https://cdn.simpleicons.org/python/3776AB",
  "PostgreSQL": "https://cdn.simpleicons.org/postgresql/4169E1",
  "Redis": "https://cdn.simpleicons.org/redis/DC382D",
  "C++": "https://cdn.simpleicons.org/cplusplus/00599C",
  "MySQL": "https://cdn.simpleicons.org/mysql/4479A1",
  "Swift": "https://cdn.simpleicons.org/swift/F05138",
  "Kotlin": "https://cdn.simpleicons.org/kotlin/7F52FF",
  "Docker": "https://cdn.simpleicons.org/docker/2496ED",
  "VS Code": "https://cdn.simpleicons.org/visualstudiocode/007ACC",
  "Figma": "https://cdn.simpleicons.org/figma/F24E1E",
  "AWS": "https://cdn.simpleicons.org/amazonaws/FF9900",
};

export const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Project", href: "#project" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

export const STACK_GROUPS = [
  {
    id: "frontend",
    label: "Frontend",
    items: ["React", "Next.js", "Vue.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML", "CSS"],
  },
  {
    id: "backend",
    label: "Backend",
    items: ["Node.js", "PowerShell", "Python", "MongoDB", "PostgreSQL", "Redis", "C++", "MySQL", "Discord.js"],
  },
  {
    id: "systems",
    label: "Systems & Tools",
    items: ["Swift", "Kotlin", "Docker", "Git", "VS Code", "Figma", "AWS", "Vercel", "Lua"],
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
