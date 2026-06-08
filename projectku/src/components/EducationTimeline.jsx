export default function EducationTimeline({ items = [], label = "Timeline" }) {
  if (!items?.length) return null;

  return (
    <div className="eduTimeline" role="list" aria-label={label}>
      {items.map((item) => (
        <div key={`${item.period}-${item.title}`} className="eduItem" role="listitem">
          <div className="eduPeriod muted">{item.period}</div>
          <div className="eduRail" aria-hidden="true">
            {item.logo ? (
              <span className="eduLogoDot">
                <img src={item.logo} alt="" loading="lazy" decoding="async" />
              </span>
            ) : (
              <span className="eduDot" />
            )}
          </div>
          <div className="eduContent">
            <h3 className="eduTitle">{item.title}</h3>
            {item.subtitle ? <p className="eduSubtitle muted">{item.subtitle}</p> : null}
            {item.details ? <p className="eduDetails muted">{item.details}</p> : null}
          </div>
        </div>
      ))}
    </div>
  );
}
