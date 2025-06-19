// context/UserContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { getQuizResults } from "../utils/localStorageHelpers";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    userId: null,
    name: "",
    avatar: "",
    points: 0,
  });

  useEffect(() => {
    const savedResults = getQuizResults();
    const total = savedResults.reduce((sum, val) => sum + (val || 0), 0);

    const storedName = localStorage.getItem("playerName");
    const storedAvatar = localStorage.getItem("playerAvatar");
    const playerId = localStorage.getItem("playerId");

    setUser({
      userId: playerId || null,
      name: storedName || "",
      avatar: storedAvatar || "",
      points: total,
    });
  }, []);

  // useEffect(() => {
  //   if (user.name) localStorage.setItem("playerName", user.name);
  //   if (user.avatar) localStorage.setItem("playerAvatar", user.avatar);
  //   if (user.points !== undefined) {
  //     localStorage.setItem("playerPoints", user.points.toString());
  //   }
  // }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
