import { motion } from "framer-motion";
import "../../styles/contactSection.css";

export default function ContactSection() {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        
        {/* LEFT CONTENT */}
        <motion.div
          className="contact-left"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="contact-title">
            CONTACT <span>US</span>
          </h2>
          <p className="contact-subtitle">Have any queries?</p>

          <div className="contact-info">
            <div className="info-block">
              <h4>Staff Coordinator</h4>
              <p>
                Dr. Sabarishwari <span>+91 95000 44401</span>
              </p>
            </div>

            <div className="info-block">
              <h4>Event Coordinator</h4>
              <p>Rishikesh KA <span>+91 86102 53720</span></p>
              <p>Rishikesh R <span>+91 73387 02686</span></p>
              <p>Darshana V <span>+91 87548 69184</span></p>
            </div>

            <div className="info-block">
              <h4>Registration & Help Desk</h4>
              <p>Aarthi E <span>+91 97915 80616</span></p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT FORM - Inputs are styled as text boxes via CSS */}
        <motion.form
          className="contact-form"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          autoComplete="off"
        >
          <input 
            type="email" 
            placeholder="Email Address" 
            className="contact-input-box" 
            required 
          />
          <input 
            type="tel" 
            placeholder="Phone Number" 
            className="contact-input-box" 
            required 
          />
          <textarea 
            placeholder="Your Message" 
            className="contact-input-box" 
            rows="5" 
            required 
          />
          
          <motion.button
            type="submit"
            className="contact-submit-btn"
            /* Enhanced Hover Actions */
            whileHover={{ 
              scale: 1.02,
              backgroundColor: "#cc0029",
              boxShadow: "0px 0px 20px rgba(255, 0, 51, 0.4)" 
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Submit Message
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}