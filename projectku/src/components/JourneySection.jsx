import { motion } from "framer-motion";
import { profile } from "../content/profile";

const itemVariants = {
  hidden: { opacity: 0, x: -18 },
  visible: (index) => ({ opacity: 1, x: 0, transition: { delay: index * 0.1, duration: 0.65, ease: [0.16, 1, 0.3, 1] } }),
};

export default function JourneySection() {
  return (
    <section id="journey" className="section journey-section">
      <div className="section-index"><span>JOURNEY</span></div>
      <h2 className="section-title">Experience &amp; Roles.<em>Community &amp; development work.</em></h2>

      <div className="journey-timeline" aria-label="Experience">
        {(profile.experience ?? []).map((item, index) => (
          <motion.article key={`${item.title}-${item.period}`} className="journey-item" custom={index} variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            <time className="journey-period">{item.period}</time>
            <div className="journey-content">
              <div className="journey-header">
                {item.logo && <img src={item.logo} alt="" className="journey-logo" loading="lazy" />}
                <h3 className="journey-role">{item.title}</h3>
              </div>
              <p className="journey-role-sub">{item.subtitle}</p>
              <p className="project-desc journey-details">{item.details}</p>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="journey-education">
        <h3 className="journey-subtitle">Education &amp; Self-Learning</h3>
        <div className="education-grid" aria-label="Education">
          {(profile.education ?? []).map((item, index) => (
            <motion.article key={item.title} className="education-item" custom={index} variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
              <time className="project-num">{item.period}</time>
              <h4 className="education-title">{item.title}</h4>
              <p className="project-desc education-subtitle">{item.subtitle}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
