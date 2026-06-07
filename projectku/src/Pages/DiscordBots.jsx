import { ArrowLeft, Bot, ExternalLink, ShieldCheck, Sparkles, Terminal } from "lucide-react";
import { profile } from "../content/profile";

const iconMap = [Bot, ShieldCheck, Terminal];

function BotCard({ bot, index }) {
  const Icon = iconMap[index % iconMap.length];

  return (
    <article className="discordBotCard">
      <div className="discordBotCardTop">
        <span className="discordBotIcon" aria-hidden="true">
          <Icon size={22} strokeWidth={2.2} />
        </span>
        <div>
          <p className="discordBotCategory">{bot.category}</p>
          <h2>{bot.name}</h2>
        </div>
      </div>

      <p className="discordBotDescription">{bot.description}</p>

      <ul className="discordBotFeatures" aria-label={`${bot.name} features`}>
        {bot.features.map((feature) => (
          <li key={feature}>
            <span aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>

      <div className="discordBotStack" aria-label={`${bot.name} stack`}>
        {bot.stack.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      <div className="discordBotFooter">
        <span className="discordBotStatus">{bot.status}</span>
        <a className="discordBotUse" href={bot.inviteUrl} target="_blank" rel="noreferrer">
          <span>Use Bot</span>
          <ExternalLink size={16} strokeWidth={2.4} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

export default function DiscordBots() {
  const bots = profile.discordBots ?? [];

  return (
    <main className="discordBotsPage" id="discord-bots">
      <section className="discordBotsHero">
        <div className="container discordBotsHeroInner">
          <a className="discordBotsBack" href="#portfolio">
            <ArrowLeft size={17} strokeWidth={2.4} aria-hidden="true" />
            <span>Back to Projects</span>
          </a>

          <div className="discordBotsHeroBadge">
            <Sparkles size={16} strokeWidth={2.2} aria-hidden="true" />
            <span>Discord Bot Lab</span>
          </div>

          <h1>Discord bots built for cleaner, calmer communities.</h1>
          <p>
            A small collection of Discord bots I build with Discord.js, focused on server
            utility, onboarding, moderation support, and readable automation.
          </p>
        </div>
      </section>

      <section className="discordBotsCatalog" aria-label="Discord bot catalog">
        <div className="container">
          <div className="discordBotsCatalogHead">
            <p className="kickerV2">Bot Collection</p>
            <h2>Choose a bot for your server</h2>
          </div>

          <div className="discordBotGrid">
            {bots.map((bot, index) => (
              <BotCard key={bot.name} bot={bot} index={index} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
