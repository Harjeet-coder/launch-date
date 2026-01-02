import citLogo from "../../assets/images/cit.png";
import hackerzLogo from "../../assets/images/hackerz.png"; // 1. Import the logo
import "../../styles/header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        
        {/* LEFT */}
        <div className="header-left">
          <img src={citLogo} alt="CIT Logo" className="header-logo" />
        </div>

        {/* CENTER */}
        <nav className="header-nav">
          <a href="#home" className="nav-link active">HEADER</a>
          
        </nav>

        {/* RIGHT - Add the image here */}
        <div className="header-right">
          <img src={hackerzLogo} alt="Hackerz Logo" className="header-logo-right" />
        </div>

      </div>
    </header>
  );
}