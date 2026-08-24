import { profile } from "../content/profile";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import Reveal from "../components/Reveal";
import { LaunchArrow } from "../components/CustomIcons";

export default function DiscordBots() {
  const bots = profile.discordBots ?? [];

  return (
    <div className="page subpage">
      <SiteHeader />
      <main>
        <section className="sub-hero">
          <a className="text-link" href="#work">
            Back to work
          </a>
          <h1 className="display">
            Discord bots
            <span>for calmer servers.</span>
          </h1>
          <p className="lede">
            Permission-aware utilities, tickets, and assistant workflows built with Discord.js.
          </p>
        </section>
        <section className="catalog">
          {bots.map((bot, index) => (
            <Reveal key={bot.name} delay={index * 80}>
              <article className="catalog-row">
                <p className="case-num">{String(index + 1).padStart(2, "0")}</p>
                <div>
                  <p className="kicker">{bot.category}</p>
                  <h2>{bot.name}</h2>
                  <p>{bot.description}</p>
                  <ul className="tech-line">
                    {bot.stack.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="catalog-aside">
                  <span>{bot.status}</span>
                  <a className="btn btn-solid" href={bot.inviteUrl} target="_blank" rel="noreferrer">
                    Use bot
                    <LaunchArrow size={14} />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
