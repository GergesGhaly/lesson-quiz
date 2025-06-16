// SoundContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const [isSoundOn, setIsSoundOn] = useState(() => {
    // نحاول جلب القيمة من localStorage عند التهيئة مباشرة
    const saved = localStorage.getItem("isSoundOn");
    return saved === null ? true : saved === "true";
    // false;
  });

  useEffect(() => {
    localStorage.setItem("isSoundOn", isSoundOn.toString());
  }, [isSoundOn]);

  return (
    <SoundContext.Provider value={{ isSoundOn, setIsSoundOn }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);
