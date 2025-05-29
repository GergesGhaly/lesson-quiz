import reward0 from "../assets/rewards/0.png";
import reward1 from "../assets/rewards/1.png";
import reward2 from "../assets/rewards/2.png";
import reward3 from "../assets/rewards/3.png";
import reward4 from "../assets/rewards/4.png";
import reward5 from "../assets/rewards/5.png";

import flag0 from "../assets/rewardsFlags/0.png";
import flag1 from "../assets/rewardsFlags/1.png";
import flag2 from "../assets/rewardsFlags/2.png";
import flag3 from "../assets/rewardsFlags/3.png";
import flag4 from "../assets/rewardsFlags/4.png";
import flag5 from "../assets/rewardsFlags/5.png";
import flag6 from "../assets/rewardsFlags/6.png";
import flag7 from "../assets/rewardsFlags/7.png";
import flag8 from "../assets/rewardsFlags/8.png";
import flag9 from "../assets/rewardsFlags/9.png";

export const rewardLevels = [
  {
    threshold: 15,
    reward: {
      ar: "وسام البدايات",
      en: "Beginner Medal",
    },
    key: "beginner",
    icon: "🥉",
  },
  {
    threshold: 30,
    reward: {
      ar: "وسام الاجتهاد",
      en: "Effort Medal",
    },
    key: "effort",
    icon: "🥈",
  },
  {
    threshold: 40,
    reward: {
      ar: "شارة الاجتهاد ",
      en: "Effort flag",
    },
    key: "effort+",
    // icon: "🥈",
    flag: flag0,
  },

  {
    threshold: 55,
    reward: {
      ar: "وسام الإنجاز",
      en: "Achievement Medal",
    },
    key: "achiever",
    icon: "🥇",
  },
  {
    threshold: 65,
    reward: {
      ar: "شارة الإنجاز ",
      en: "Achievement flag",
    },
    key: "achiever+",
    // icon: "🥇",
    flag: flag1,
  },

  {
    threshold: 75,
    reward: {
      ar: "وسام النخبة",
      en: "Elite Medal",
    },
    key: "elite",
    icon: "🏅",
  },
  {
    threshold: 85,
    reward: {
      ar: "شارة النخبة ",
      en: "Elite flag",
    },
    key: "elite+",
    // icon: "🏅",
    flag: flag2,
  },

  {
    threshold: 100,
    reward: {
      ar: "وسام التميز",
      en: "Excellence Medal",
    },
    key: "excellence",
    icon: "🎖",
  },

  {
    threshold: 110,
    reward: {
      ar: "شارة التميز",
      en: "Excellence flag",
    },
    key: "excellence+",
    // icon: "🎖",
    flag: flag3,
  },

  {
    threshold: 125,
    reward: {
      ar: "وسام الأسطورة",
      en: "Legend Medal",
    },
    key: "legend",
    icon: "👑",
  },

  {
    threshold: 125,
    reward: {
      ar: "شارة الأسطورة",
      en: "Legend flag",
    },
    key: "legend+",
    // icon: "👑",
    flag: flag4,
  },

  {
    threshold: 135,
    reward: {
      ar: "وسام الحكمة",
      en: "Wisdom Medal",
    },
    key: "wisdom",
    image: reward0,
  },

  {
    threshold: 145,
    reward: {
      ar: "شارة الحكمة",
      en: "Wisdom flag",
    },
    key: "wisdom+",
    // image: reward0,
    flag: flag5,
  },

  {
    threshold: 160,
    reward: {
      ar: "وسام النور",
      en: "Light Medal",
    },
    key: "light",
    image: reward1,
  },

  {
    threshold: 160,
    reward: {
      ar: "شارة النور",
      en: "Light flag",
    },
    key: "light+",
    // image: reward1,
    flag: flag6,
  },

  {
    threshold: 175,
    reward: {
      ar: "وسام الشجاعة",
      en: "Courage Medal",
    },
    key: "courage",
    image: reward2,
  },

  {
    threshold: 185,
    reward: {
      ar: "شارة الشجاعة",
      en: "Courage flag",
    },
    key: "courage+",
    // image: reward2,
    flag: flag7,
  },

  {
    threshold: 200,
    reward: {
      ar: "وسام المحارب",
      en: "Warrior Medal",
    },
    key: "warrior",
    image: reward3,
  },

  {
    threshold: 210,
    reward: {
      ar: "شارة المحارب",
      en: "Warrior flag",
    },
    key: "warrior+",
    // image: reward3,
    flag: flag8,
  },

  {
    threshold: 225,
    reward: {
      ar: "وسام المُعلِّم",
      en: "Master Medal",
    },
    key: "master",
    image: reward4,
  },
  {
    threshold: 235,
    reward: {
      ar: "شارة المُعلِّم",
      en: "Master flag",
    },
    key: "master+",
    // image: reward4,
    flag: flag9,
  },

  {
    threshold: 250,
    reward: {
      ar: "وسام الخالد",
      en: "Eternal Medal",
    },
    key: "eternal",
    image: reward5,
  },
  // {
  //   threshold: 260,
  //   reward: {
  //     ar: "شارة الخالد",
  //     en: "Eternal flag",
  //   },
  //   key: "eternal",
  //   // image: reward5,
  //   flag: flag10,
  // },
];
