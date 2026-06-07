const DEFAULT_PHRASE = "Universitas Terbuka (UT)";

export default function HighlightText({ text, phrase = DEFAULT_PHRASE }) {
  const source = String(text ?? "");
  if (!phrase || !source.includes(phrase)) return source;

  const parts = source.split(phrase);

  return (
    <>
      {parts.map((part, index) => (
        <span key={`${part}-${index}`}>
          {part}
          {index < parts.length - 1 ? (
            <strong className="aboutTextHighlight">{phrase}</strong>
          ) : null}
        </span>
      ))}
    </>
  );
}
