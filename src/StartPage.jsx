import React, { useEffect, useState } from "react";
import wallPc from "./assets/startWallPc-Photoroom.png";
import play from "./assets/buttons/play.png";
import battel from "./assets/buttons/battel.png";
import setting from "./assets/buttons/setting.png";
import logo from "./assets/logo.png";
import { Link } from "react-router-dom";
import ProfileNavigationBtn from "./components/ProfileNavigationBtn";

const StartPage = () => {
  const [buttons, setButtons] = useState([
    {
      title: "ابدأ الاختبار",
      link: "/ChooseTestPage",
      image: play,
    },
    {
      title: " البطولة",
      link: "/competition",
      image: battel,
    },
    // {
    //   title: "حسابي",
    //   link: "/profile",
    //   image: "",
    // },
  ]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${wallPc})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",

        minHeight: "100vh",
        // width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <img
        style={{ width: "100%", maxWidth: "500px" }}
        src={logo}
        alt=""
        srcset=""
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          //   marginTop: "20px",
          maxWidth: "300px",
        }}
      >
        {buttons.map((btn) => {
          return (
            <Link to={btn.link}>
              {/* <button> {btn.title}</button> */}
              <img  src={btn.image} alt={btn.title} srcset="" />
            </Link>
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          //   marginTop: "20px",
          maxWidth: "110px",
        }}
      >
        <button style={{ backgroundColor: "transparent", border: "none", cursor: "pointer" }}>
          <img src={setting} alt="" srcset="" />
        </button>
      </div>
      ;
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          //   gap: "20px",
        }}
      >
        <ProfileNavigationBtn />
      </div>
    </div>
  );
};

export default StartPage;
