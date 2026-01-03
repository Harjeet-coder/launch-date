import "../../styles/events.css";

import techImage from "../../assets/images/tech.png";
import nonTechImage from "../../assets/images/nontech.png";
import workshopImage from "../../assets/images/workshops.png";

export default function Events() {
  return (
    <section className="events-section" id="events">
      <h2 className="events-title">
        EXCITING <span>EVENTS</span>
      </h2>

      <div className="events-grid">
        {/* ================= TECHNICAL ================= */}
        <div className="event-card event-card-technical">
          <div className="event-card-visual">
            <img
              src={techImage}
              alt="Technical Events"
              className="event-tech-image"
            />
          </div>

          <div className="event-card-content">
            <h3 className="event-heading">Technical</h3>
            <p className="event-text">
              Dive into cutting-edge technical challenges covering
              Cybersecurity, Artificial Intelligence, Web Technologies,
              and real-world problem-solving arenas designed to test
              elite technical skills.
            </p>
            <a className="event-link" href="#">
              Explore Technical Events →
            </a>
          </div>
        </div>

        {/* ================= NON-TECHNICAL ================= */}
        <div className="event-card event-card-nontech">
          <div className="event-card-content">
            <h3 className="event-heading">Non-Technical</h3>
            <p className="event-text">
              Step away from the keyboard and into creativity, strategy,
              and entertainment. From brain-teasing games to fun-filled
              activities, there’s something for everyone.
            </p>
            <a className="event-link" href="#">
              Discover Non-Technical Events →
            </a>
          </div>

          <div className="event-card-visual">
            <img
              src={nonTechImage}
              alt="Non Technical Events"
              className="event-tech-image"
            />
          </div>
        </div>

        {/* ================= WORKSHOP ================= */}
        <div className="event-card event-card-technical">
          <div className="event-card-visual">
            <img
              src={workshopImage}
              alt="Workshops"
              className="event-tech-image"
            />
          </div>

          <div className="event-card-content">
            <h3 className="event-heading">Workshop</h3>
            <p className="event-text">
                Learn directly from industry experts through immersive
                workshops that take you from fundamentals to advanced
                    concepts with hands-on guidance.
            </p>
            <a className="event-link" href="#">
              Check Out Workshops →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
