import "../../styles/footer.css";
import citLogo from "../../assets/images/cit.png";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section: Logo */}
        <div className="footer-logo-section">
         <img src={citLogo} alt="CIT Logo" className="footer-logo" />
          <p className="logo-tagline">Transforming Lives</p>
        </div>

        {/* Right Section: Links Columns */}
        <div className="footer-links-grid">
          <div className="footer-column">
            <h4>Events</h4>
            <ul>
              <li>Technical</li>
              <li>Non-Technical</li>
              <li>Workshop</li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>About</h4>
            <ul>
              <li>Symposium</li>
              <li>Sponsors</li>
              <li>Department</li>
              <li>College</li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Reach Us</h4>
            <ul>
              <li>Mail</li>
              <li>Instagram</li>
              <li>Twitter</li>
              <li>Contact Us</li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Other Links</h4>
            <ul>
              <li>Terms and Services</li>
              <li>Privacy Policy</li>
              <li>Refund Policy</li>
            </ul>
          </div>
        </div>
      </div>

      <hr className="footer-divider" />

      <div className="footer-bottom">
        <div className="footer-copy">
          <span>COPYRIGHT © HACKERZ 2026</span>
        </div>
        <div className="footer-socials">
          <i className="fa-envelope"></i>
          <i className="fa-instagram"></i>
          <i className="fa-twitter"></i>
          <i className="fa-facebook"></i>
        </div>
      </div>
    </footer>
  );
}