import React, { createContext, useContext, useState, useEffect } from "react";
import { getQuizResults } from "../utils/localStorageHelpers";

// السياق
const UserContext = createContext();

// المزود
export const UserProvider = ({ children }) => {
  const [totalScore, setTotalScore] = useState(0);

  const [user, setUser] = useState({
    userId: null,
    name: "",
    avatar: "",
    points: 0,
    rewards: [],
  });

  // تحميل البيانات من localStorage عند بدء التشغيل
  useEffect(() => {
    const savedResults = getQuizResults();
    // setQuizResults(savedResults);

    const total = savedResults.reduce((sum, val) => sum + (val || 0), 0);
    setTotalScore(total);

    const storedName = localStorage.getItem("playerName");
    const storedAvatar = localStorage.getItem("playerAvatar");
    const playerId = localStorage.getItem("playerId");
    const storedRewards = JSON.parse(
      localStorage.getItem("playerRewards") || "[]"
    );

    if (storedName && storedAvatar) {
      setUser({
        userId: playerId,
        name: storedName,
        avatar: storedAvatar,
        points: totalScore,
        rewards: storedRewards,
      });
    }
  }, []);

  // تحديث البيانات في localStorage كلما تغيّر المستخدم
  useEffect(() => {
    if (user.name) localStorage.setItem("playerName", user.name);
    if (user.avatar) localStorage.setItem("playerAvatar", user.avatar);
    // localStorage.setItem("playerPoints", user.points.toString());
    // localStorage.setItem("playerRewards", JSON.stringify(user.rewards));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// هوك لاستخدام السياق
export const useUser = () => useContext(UserContext);
