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


export function storeNewRewardToast(reward) {
  if (!reward) return;

  try {
    localStorage.setItem("newRewardToast", JSON.stringify(reward));
  } catch (err) {
    console.error("فشل في تخزين المكافأة الجديدة:", err);
  }
}


export function getAndClearNewRewardToast() {
  const rewardStr = localStorage.getItem("newRewardToast");
  if (!rewardStr) return null;

  localStorage.removeItem("newRewardToast");

  try {
    return JSON.parse(rewardStr);
  } catch (err) {
    console.warn("خطأ في قراءة المكافأة:", err);
    return null;
  }
}



// utils/localResultsHelpers.ts
