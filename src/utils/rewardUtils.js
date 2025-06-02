import { rewardLevels } from "../data/RewardLevelsWithTranslation";

export function checkAndGrantRewards(totalScore, unlockedRewards) {
  let newlyUnlocked = [];

  rewardLevels.forEach(
    ({ threshold, reward, key, icon, image, flag, shield, sword }) => {
      if (totalScore >= threshold && !unlockedRewards.includes(key)) {
        newlyUnlocked.push({
          key,
          reward,
          icon,
          image,
          threshold,
          flag,
          shield,
          sword,
        });
      }
    }
  );

  return newlyUnlocked;
}

export function getRewardsDisplay(unlockedKeys) {
  return rewardLevels.filter((r) => unlockedKeys.includes(r.key));
}
