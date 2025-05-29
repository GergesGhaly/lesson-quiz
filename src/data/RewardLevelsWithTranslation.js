import reward0 from "../assets/rewards/0.png";
import reward1 from "../assets/rewards/1.png";
import reward2 from "../assets/rewards/2.png";
import reward3 from "../assets/rewards/3.png";
import reward4 from "../assets/rewards/4.png";
import reward5 from "../assets/rewards/5.png";

export const rewardLevels = [
  {
    threshold: 10,
    reward: {
      ar: "وسام البدايات",
      en: "Beginner Medal",
    },
    key: "beginner",
    icon: "🥉",
  },
  {
    threshold: 20,
    reward: {
      ar: "وسام الاجتهاد",
      en: "Effort Medal",
    },
    key: "effort",
    icon: "🥈",
  },
  {
    threshold: 30,
    reward: {
      ar: "وسام الإنجاز",
      en: "Achievement Medal",
    },
    key: "achiever",
    icon: "🥇",
  },
  {
    threshold: 40,
    reward: {
      ar: "وسام النخبة",
      en: "Elite Medal",
    },
    key: "elite",
    icon: "🏅",
  },
  {
    threshold: 45,
    reward: {
      ar: "وسام التميز",
      en: "Excellence Medal",
    },
    key: "excellence",
    icon: "🎖",
  },
  {
    threshold: 55,
    reward: {
      ar: "وسام الأسطورة",
      en: "Legend Medal",
    },
    key: "legend",
    icon: "👑",
  },
  {
    threshold: 60,
    reward: {
      ar: "وسام الحكمة",
      en: "Wisdom Medal",
    },
    key: "wisdom",
    image: reward0,
    
  },
  {
    threshold: 70,
    reward: {
      ar: "وسام النور",
      en: "Light Medal",
    },
    key: "light",
    image: reward1,
  },
  {
    threshold: 80,
    reward: {
      ar: "وسام الشجاعة",
      en: "Courage Medal",
    },
    key: "courage",
    image: reward2,
  },
  {
    threshold: 90,
    reward: {
      ar: "وسام المحارب",
      en: "Warrior Medal",
    },
    key: "warrior",
    image: reward3,
  },
  {
    threshold: 100,
    reward: {
      ar: "وسام المُعلِّم",
      en: "Master Medal",
    },
    key: "master",
    image: reward4,
  },
  {
    threshold: 110,
    reward: {
      ar: "وسام الخالد",
      en: "Eternal Medal",
    },
    key: "eternal",
    image: reward5,
  },
];
