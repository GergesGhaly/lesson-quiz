import { rewardLevels } from "../data/rewardLevels";

export function checkAndGrantRewards(totalScore, unlockedRewards) {
  let newlyUnlocked = [];

  rewardLevels.forEach(({ threshold, reward, key }) => {
    if (totalScore >= threshold && !unlockedRewards.includes(key)) {
      newlyUnlocked.push({ key, reward });
    }
  });

  return newlyUnlocked;
}

export function getRewardsDisplay(unlockedKeys) {
  return rewardLevels.filter(r => unlockedKeys.includes(r.key));
}
