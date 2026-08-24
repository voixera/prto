import { useState } from "react";
import { STACK_GROUPS } from "../content/site";
import Reveal from "./Reveal";

export default function StackSection() {
  const [active, setActive] = useState("React");

  return (
    <section id="stack" className="section stack">
      <div className="section-index">
        <span>02</span>
        <span>Stack</span>
      </div>
      <div className="section-body">
        <Reveal>
          <h2 className="section-title">
            Tools I keep
            <em> close to the work.</em>
          </h2>
        </Reveal>
        <div className="stack-board" data-active={active}>
          {STACK_GROUPS.map((group, index) => (
            <Reveal key={group.id} delay={index * 80} className="stack-col">
              <p className="kicker">{group.label}</p>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      className={active === item ? "is-active" : ""}
                      onMouseEnter={() => setActive(item)}
                      onFocus={() => setActive(item)}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
          <svg className="stack-lines" viewBox="0 0 320 180" aria-hidden="true">
            <path d="M20 20H300V160H20Z" />
            <path className="stack-pulse" d="M20 90H300" />
            <circle cx="20" cy="90" r="3" />
            <circle cx="300" cy="90" r="3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
