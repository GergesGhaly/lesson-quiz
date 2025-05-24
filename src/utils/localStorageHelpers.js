export const getQuizResults = () => {
  return JSON.parse(localStorage.getItem("quizResults")) || [];
};

export const saveQuizResults = (results) => {
  localStorage.setItem("quizResults", JSON.stringify(results));
};

export const getUnlockedRewards = () => {
  return JSON.parse(localStorage.getItem("unlockedRewards")) || [];
};

export const saveUnlockedRewards = (rewards) => {
  localStorage.setItem("unlockedRewards", JSON.stringify(rewards));
};
