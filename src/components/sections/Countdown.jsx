import { useCountdown } from "../../hooks/useCountdown";
import { siteConfig } from "../../config/siteConfig";

export default function Countdown() {
  const time = useCountdown(siteConfig.eventDate);

  return (
    <div className="countdown">
      {Object.entries(time).map(([label, value]) => (
        <div key={label} className="time-box">
          <span className="value">{value}</span>
          <span className="label">{label}</span>
        </div>
      ))}
    </div>
  );
}
