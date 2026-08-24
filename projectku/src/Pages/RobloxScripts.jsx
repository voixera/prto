import { profile } from "../content/profile";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import Reveal from "../components/Reveal";

export default function RobloxScripts() {
  const scripts = profile.robloxScripts ?? [];

  return (
    <div className="page subpage">
      <SiteHeader />
      <main>
        <section className="sub-hero">
          <a className="text-link" href="#work">
            Back to work
          </a>
          <h1 className="display">
            Lua previews
            <span>from game tooling.</span>
          </h1>
          <p className="lede">
            A secondary catalog of Roblox Lua experiments, interfaces, and automation patterns.
          </p>
        </section>
        <section className="catalog">
          {scripts.map((script, index) => (
            <Reveal key={script.name} delay={index * 50}>
              <article className="catalog-row lua-row">
                <p className="case-num">{String(index + 1).padStart(2, "0")}</p>
                <figure className="lua-thumb">
                  {script.iconSrc ? <img src={script.iconSrc} alt="" loading="lazy" /> : null}
                </figure>
                <div>
                  <p className="kicker">{script.category}</p>
                  <h2>{script.name}</h2>
                  <p>{script.description}</p>
                  {script.videoSrc ? (
                    <video
                      className="lua-video"
                      controls
                      muted
                      playsInline
                      preload="metadata"
                      aria-label={`${script.name} preview`}
                    >
                      <source src={script.videoSrc} type="video/mp4" />
                    </video>
                  ) : null}
                  <ul className="tech-line">
                    {script.stack.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                {script.status ? <span className="catalog-aside">{script.status}</span> : null}
              </article>
            </Reveal>
          ))}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
