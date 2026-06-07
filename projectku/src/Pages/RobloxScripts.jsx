import { ArrowLeft } from "lucide-react";
import { profile } from "../content/profile";

function RobloxScriptCard({ script }) {
  return (
    <article className="robloxScriptCard">
      <div className="robloxScriptCardTop">
        <span className="robloxScriptIcon" aria-hidden="true">
          <img src={script.iconSrc} alt="" loading="lazy" decoding="async" />
        </span>
        <div>
          <p className="robloxScriptCategory">{script.category}</p>
          <h2>{script.name}</h2>
        </div>
      </div>

      <p className="robloxScriptDescription">{script.description}</p>

      <div className="robloxScriptVideoFrame">
        <video
          className="robloxScriptVideo"
          controls
          muted
          playsInline
          preload="metadata"
          poster={script.poster}
          aria-label={`${script.name} video preview`}
        >
          <source src={script.videoSrc} type="video/mp4" />
        </video>
      </div>

      <ul className="robloxScriptFeatures" aria-label={`${script.name} highlights`}>
        {script.features.map((feature) => (
          <li key={feature}>
            <span aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>

      <div className="robloxScriptStack" aria-label={`${script.name} stack`}>
        {script.stack.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      <p className="robloxScriptStatus">{script.status}</p>
    </article>
  );
}

export default function RobloxScripts() {
  const scripts = profile.robloxScripts ?? [];

  return (
    <main className="robloxScriptsPage" id="roblox-scripts">
      <section className="robloxScriptsHero">
        <div className="container robloxScriptsHeroInner">
          <a className="discordBotsBack" href="#portfolio">
            <ArrowLeft size={17} strokeWidth={2.4} aria-hidden="true" />
            <span>Back to Projects</span>
          </a>

          <h1>Roblox Lua script previews for clean UI experiments.</h1>
          <p>
            A small preview collection of Roblox Lua scripts focused on interface helpers,
            simple automation patterns, and organized code structure for learning.
          </p>
        </div>
      </section>

      <section className="robloxScriptsCatalog" aria-label="Roblox Lua script previews">
        <div className="container">
          <div className="robloxScriptsCatalogHead">
            <p className="kickerV2">Lua Preview</p>
            <h2>Explore the script samples</h2>
          </div>

          <div className="robloxScriptGrid">
            {scripts.map((script) => (
              <RobloxScriptCard key={script.name} script={script} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
