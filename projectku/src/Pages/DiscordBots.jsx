import { motion } from "framer-motion";
import { profile } from "../content/profile";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import Reveal from "../components/Reveal";

export default function DiscordBots() {
  const bots = profile.discordBots ?? [];
  return <div className="page subpage discord"><SiteHeader /><main>
    <section className="sub-hero bot-hero"><a className="text-link" href="#work"><span className="link-line" />Back to work</a><OrganicShape className="bot-hero-shape" size={250} color="rgba(216,255,101,.72)" /><h1 className="display"><em>Discord</em><span>without the noise.</span></h1><p className="lede">Permission-aware utilities, ticket systems, and assistant workflows built with Discord.js and Node.js.</p></section>
    <section className="bot-archive">{bots.map((bot, index) => <Reveal key={bot.name} delay={index * 70}><motion.article className="bot-entry" whileHover={{ x: 10 }}><span className="bot-number">0{index + 1}</span><div><span className="kicker">{bot.category}</span><h2>{bot.name}</h2><p>{bot.description}</p><ul className="tech-line">{bot.stack.map((item) => <li key={item}>{item}</li>)}</ul></div><div className="bot-action"><span>{bot.status}</span><a className="project-stage-link" href={bot.inviteUrl} target="_blank" rel="noreferrer">Use bot <span aria-hidden="true">↗</span></a></div></motion.article></Reveal>)}</section>
  </main><SiteFooter /></div>;
}
