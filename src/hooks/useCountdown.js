import { useEffect, useRef, useState } from "react";

const useCountdown = (start, onEnd) => {
  const [countdown, setCountdown] = useState(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (start) {
      setCountdown(60);
      intervalRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            onEnd();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [start]);

  return countdown;
};

export default useCountdown;
