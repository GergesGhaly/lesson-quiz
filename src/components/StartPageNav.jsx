import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import profileBtn from "../assets/profileBtn.png";
import aboutBtn from "../assets/buttons/aboutBtn.png";

const StartPageNav = ({ setShowAbout }) => {
  return (
    <div
      style={{
        width: "100%",
        // height: "60px",
        // position: "absolute",
        // buttom: "10px",
        // left: "10px",
        zIndex: "999999",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <Link to="/profile">
        <motion.img
          whileHover={{ scale: 1.1 }}
          src={profileBtn}
          style={{
            width: "60px",
            // height: "100%",
            objectFit: "cover",
          }}
          alt="profile"
        />
      </Link>

      <motion.img
        whileHover={{ scale: 1.1 }}
        src={aboutBtn}
        onClick={() => setShowAbout(true)}
        style={{
          width: "60px",
          objectFit: "cover",
        }}
        alt="profile"
      />
    </div>
  );
};

export default StartPageNav;
