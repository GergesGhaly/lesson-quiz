import reward0 from "../assets/rewards/0.avif";
import reward1 from "../assets/rewards/1.avif";
import reward2 from "../assets/rewards/2.avif";
import reward3 from "../assets/rewards/3.avif";
import reward4 from "../assets/rewards/4.avif";
import reward5 from "../assets/rewards/5.avif";

//flags
import flag0 from "../assets/rewardsFlags/0.avif";
import flag1 from "../assets/rewardsFlags/1.avif";
import flag2 from "../assets/rewardsFlags/2.avif";
import flag3 from "../assets/rewardsFlags/3.avif";
import flag4 from "../assets/rewardsFlags/4.avif";
import flag5 from "../assets/rewardsFlags/5.avif";
import flag6 from "../assets/rewardsFlags/6.avif";
import flag7 from "../assets/rewardsFlags/7.avif";
import flag8 from "../assets/rewardsFlags/8.avif";
import flag9 from "../assets/rewardsFlags/9.avif";

//shields
import shield0 from "../assets/rewardsShields/0.avif";
import shield1 from "../assets/rewardsShields/1.avif";
import shield2 from "../assets/rewardsShields/2.avif";
import shield3 from "../assets/rewardsShields/3.avif";
import shield4 from "../assets/rewardsShields/4.avif";
import shield5 from "../assets/rewardsShields/5.avif";
import shield6 from "../assets/rewardsShields/6.avif";
import shield7 from "../assets/rewardsShields/7.avif";
import shield8 from "../assets/rewardsShields/8.avif";
import shield9 from "../assets/rewardsShields/9.avif";
import shield10 from "../assets/rewardsShields/10.avif";

//swords
import swoard0 from "../assets/rewardsSwoards/0.avif";
import swoard1 from "../assets/rewardsSwoards/1.avif";
import swoard2 from "../assets/rewardsSwoards/2.avif";
import swoard3 from "../assets/rewardsSwoards/3.avif";
import swoard4 from "../assets/rewardsSwoards/4.avif";
import swoard5 from "../assets/rewardsSwoards/5.avif";
import swoard6 from "../assets/rewardsSwoards/6.avif";
import swoard7 from "../assets/rewardsSwoards/7.avif";
import swoard8 from "../assets/rewardsSwoards/8.avif";

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

    flag: flag3,
  },

  {
    threshold: 120,
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
  {
    threshold: 260,
    reward: {
      ar: "درع الحكيم",
      en: "Shield of Wisdom",
    },
    key: "wisdom_shield",
    shield: shield0,
  },
  {
    threshold: 270,
    reward: {
      ar: "سيف الشجاعة",
      en: "Sword of Courage",
    },
    key: "courage_sword",
    sword: swoard0,
  },
  {
    threshold: 280,
    reward: {
      ar: "درع النور",
      en: "Shield of Light",
    },
    key: "light_shield",
    shield: shield1,
  },
  {
    threshold: 290,
    reward: {
      ar: "سيف النور",
      en: "Sword of Light",
    },
    key: "light_sword",
    sword: swoard1,
  },
  {
    threshold: 300,
    reward: {
      ar: "درع المحارب",
      en: "Shield of the Warrior",
    },
    key: "warrior_shield",
    shield: shield2,
  },
  {
    threshold: 310,
    reward: {
      ar: "سيف المحارب",
      en: "Sword of the Warrior",
    },
    key: "warrior_sword",
    sword: swoard2,
  },
  {
    threshold: 320,
    reward: {
      ar: "درع المُعلِّم",
      en: "Shield of the Master",
    },
    key: "master_shield",
    shield: shield3,
  },
  {
    threshold: 330,
    reward: {
      ar: "سيف المُعلِّم",
      en: "Sword of the Master",
    },
    key: "master_sword",
    sword: swoard3,
  },
  {
    threshold: 340,
    reward: {
      ar: "درع الخالد",
      en: "Shield of the Eternal",
    },
    key: "eternal_shield",
    shield: shield4,
  },
  {
    threshold: 350,
    reward: {
      ar: "سيف الخالد",
      en: "Sword of the Eternal",
    },
    key: "eternal_sword",
    sword: swoard4,
  },
  {
    threshold: 360,
    reward: {
      ar: "درع التحدي",
      en: "Shield of Challenge",
    },
    key: "challenge_shield",
    shield: shield5,
  },
  {
    threshold: 370,
    reward: {
      ar: "سيف التحدي",
      en: "Sword of Challenge",
    },
    key: "challenge_sword",
    sword: swoard5,
  },
  {
    threshold: 380,
    reward: {
      ar: "درع النصر",
      en: "Shield of Victory",
    },
    key: "victory_shield",
    shield: shield6,
  },
  {
    threshold: 390,
    reward: {
      ar: "سيف النصر",
      en: "Sword of Victory",
    },
    key: "victory_sword",
    sword: swoard6,
  },
  {
    threshold: 400,
    reward: {
      ar: "درع الأسطورة",
      en: "Shield of Legend",
    },
    key: "legend_shield",
    shield: shield7,
  },
  {
    threshold: 410,
    reward: {
      ar: "سيف الأسطورة",
      en: "Sword of Legend",
    },
    key: "legend_sword",
    sword: swoard7,
  },
  {
    threshold: 420,
    reward: {
      ar: "درع القوة",
      en: "Shield of Power",
    },
    key: "power_shield",
    shield: shield8,
  },
  {
    threshold: 430,
    reward: {
      ar: "سيف القوة",
      en: "Sword of Power",
    },
    key: "power_sword",
    sword: swoard8,
  },
  {
    threshold: 440,
    reward: {
      ar: "درع النهاية",
      en: "Shield of the End",
    },
    key: "end_shield",
    shield: shield9,
  },
  {
    threshold: 450,
    reward: {
      ar: "درع الأبطال",
      en: "Shield of Heroes",
    },
    key: "heroes_shield",
    shield: shield10,
  },
];
