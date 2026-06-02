import { useEffect, useMemo, useState } from "react";

function formatDeveloperCode(profile) {
  const stack = profile.heroChips.map((chip) => `"${chip}"`).join(", ");

  return [
    "const developer = {",
    `  name: "${profile.name}",`,
    `  role: "${profile.role}",`,
    `  location: "${profile.location}",`,
    `  experience: "${profile.yearsExperience} years",`,
    `  stack: [${stack}],`,
    "};",
  ].join("\n");
}

export default function TypingCodeBlock({ profile }) {
  const code = useMemo(() => formatDeveloperCode(profile), [profile]);
  const [visibleLength, setVisibleLength] = useState(0);
  const [phase, setPhase] = useState("typing");

  useEffect(() => {
    setVisibleLength(0);
    setPhase("typing");
    const typeDelay = 24;
    const holdDelay = 720;
    const resetDelay = 680;
    const clearDelay = 220;
    const timeoutIds = new Set();

    const delay = (callback, ms) => {
      const timeoutId = window.setTimeout(() => {
        timeoutIds.delete(timeoutId);
        callback();
      }, ms);
      timeoutIds.add(timeoutId);
      return timeoutId;
    };

    function scheduleNext(length) {
      if (length < code.length) {
        setPhase("typing");
        delay(() => {
          const nextLength = length + 1;
          setVisibleLength(nextLength);
          scheduleNext(nextLength);
        }, code[length] === "\n" ? typeDelay * 5 : typeDelay);
        return;
      }

      setPhase("complete");
      delay(() => {
        setPhase("reset");
        delay(() => {
          setVisibleLength(0);
          setPhase("typing");
          delay(() => scheduleNext(0), clearDelay);
        }, resetDelay);
      }, holdDelay);
    }

    scheduleNext(0);
    return () => timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
  }, [code]);

  const visibleCode = code.slice(0, visibleLength);

  return (
    <pre className={`typingCode typingCode--${phase}`} aria-label="Developer summary code">
      <code className="typingCodeGhost" aria-hidden="true">
        {code}
      </code>
      <code className="typingCodeVisible">
        {visibleCode}
        <span className="typingCursor" aria-hidden="true" />
      </code>
    </pre>
  );
}
