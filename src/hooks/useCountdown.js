import { useEffect, useState } from "react";

export function useCountdown(targetDate) {
  const [time, setTime] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = new Date(targetDate) - new Date();
      if (diff <= 0) return;

      setTime({
        Days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        Hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        Minutes: Math.floor((diff / 1000 / 60) % 60),
        Seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return time;
}
