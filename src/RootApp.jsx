import { StrictMode, useEffect, useState } from "react";
import App from "./App.jsx";
import { SoundProvider } from "./contexts/SoundContext";
import LoadingScreen from "./LoadingScreen.jsx";

// Images
import aleafs from "./assets/aleafs.avif";
import btnWall from "./assets/btnWall.avif";
import butterfly from "./assets/butterfly.avif";
import choosTestBg from "./assets/choosTestBg.webp";
import logo2 from "./assets/logo2.avif";
import mainWall from "./assets/mainWall.webp";
import startChallengWall from "./assets/startChallengWall.webp";
import aboutBtn from "./assets/buttons/aboutBtn.avif";
import battel from "./assets/buttons/battel.avif";
import profileBtn from "./assets/buttons/profileBtn.avif";
import sound from "./assets/buttons/sound.avif";
import play from "./assets/buttons/play.avif";

// Flags
import flag0 from "./assets/rewardsFlags/0.avif";
import flag1 from "./assets/rewardsFlags/1.avif";
import flag2 from "./assets/rewardsFlags/2.avif";
import flag3 from "./assets/rewardsFlags/3.avif";
import flag4 from "./assets/rewardsFlags/4.avif";
import flag5 from "./assets/rewardsFlags/5.avif";
import flag6 from "./assets/rewardsFlags/6.avif";
import flag7 from "./assets/rewardsFlags/7.avif";
import flag8 from "./assets/rewardsFlags/8.avif";
import flag9 from "./assets/rewardsFlags/9.avif";

// Shields
import shield0 from "./assets/rewardsShields/0.avif";
import shield1 from "./assets/rewardsShields/1.avif";
import shield2 from "./assets/rewardsShields/2.avif";
import shield3 from "./assets/rewardsShields/3.avif";
import shield4 from "./assets/rewardsShields/4.avif";
import shield5 from "./assets/rewardsShields/5.avif";
import shield6 from "./assets/rewardsShields/6.avif";
import shield7 from "./assets/rewardsShields/7.avif";
import shield8 from "./assets/rewardsShields/8.avif";
import shield9 from "./assets/rewardsShields/9.avif";
import shield10 from "./assets/rewardsShields/10.avif";

// Swords
import swoard0 from "./assets/rewardsSwoards/0.avif";
import swoard1 from "./assets/rewardsSwoards/1.avif";
import swoard2 from "./assets/rewardsSwoards/2.avif";
import swoard3 from "./assets/rewardsSwoards/3.avif";
import swoard4 from "./assets/rewardsSwoards/4.avif";
import swoard5 from "./assets/rewardsSwoards/5.avif";
import swoard6 from "./assets/rewardsSwoards/6.avif";
import swoard7 from "./assets/rewardsSwoards/7.avif";
import swoard8 from "./assets/rewardsSwoards/8.avif";

// Sounds
import proifile from "/sound/proifile.mp3";
import bgMusicFile from "/sound/sky-lark-sound-birds.mp3";
import moriningForsetBg from "/sound/moriningForsetBg_out.mp3";
import bgMusic from "/sound/gameBackground.mp3";
import combo from "/sound/combo.mp3";
import win from "/sound/win.mp3";
import { UserProvider } from "./contexts/UserContext.jsx";
import { useUser } from "./hooks/useUser.js";

const RootApp = () => {
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);

  const imagesToPreload = [
    aleafs,
    btnWall,
    butterfly,
    choosTestBg,
    logo2,
    mainWall,
    startChallengWall,
    aboutBtn,
    battel,
    profileBtn,
    sound,
    play,
    // Flags
    flag0,
    flag1,
    flag2,
    flag3,
    flag4,
    flag5,
    flag6,
    flag7,
    flag8,
    flag9,
    // Shields
    shield0,
    shield1,
    shield2,
    shield3,
    shield4,
    shield5,
    shield6,
    shield7,
    shield8,
    shield9,
    shield10,
    // Swords
    swoard0,
    swoard1,
    swoard2,
    swoard3,
    swoard4,
    swoard5,
    swoard6,
    swoard7,
    swoard8,
  ];

  const soundsToPreload = [
    proifile,
    bgMusicFile,
    moriningForsetBg,
    bgMusic,
    combo,
    win,
  ];

  const totalAssets = imagesToPreload.length + soundsToPreload.length;
  let loadedCount = 0;

  const handleProgress = () => {
    loadedCount += 1;
    setProgress((loadedCount / totalAssets) * 100);
  };

  const preloadImages = (srcs) =>
    Promise.all(
      srcs.map(
        (src) =>
          new Promise((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
              handleProgress();
              resolve(src);
            };
            img.onerror = () => {
              handleProgress();
              resolve(src);
            };
          })
      )
    );

  const preloadSounds = (srcs) =>
    Promise.all(
      srcs.map(
        (src) =>
          new Promise((resolve) => {
            const audio = new Audio();
            audio.src = src;
            audio.onloadeddata = () => {
              handleProgress();
              resolve(src);
            };
            audio.onerror = () => {
              handleProgress();
              resolve(src);
            };
          })
      )
    );

  useEffect(() => {
    console.log("Start preloading assets...");
    Promise.all([
      preloadImages(imagesToPreload),
      preloadSounds(soundsToPreload),
    ]).then(() => {
      console.log("All assets preloaded.");
      setReady(true);
    });
  }, []);

  if (!ready) return <LoadingScreen progress={progress} />;

  return (
    // <StrictMode>
    <UserProvider>
      <SoundProvider>
        <App />
      </SoundProvider>
    </UserProvider>
    // </StrictMode>
  );
};

export default RootApp;
