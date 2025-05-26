import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import profileBtn from "../assets/profileBtn.png";
import aboutBtn from "../assets/aboutBtn.png";

const ProfileNavigationBtn = () => {
  return (
    <div
      style={{
        width: "100%",
        // height: "60px",
        position: "absolute",
        buttom: "10px",
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
          src={profileBtn}
          style={{
            width: "60px",
            // height: "100%",
            objectFit: "cover",
          }}
          alt="profile"
        />
      </Link>

      {/* <Link to="/profile">
        <motion.img
          src={aboutBtn}
          style={{
            width: "60px",
            objectFit: "cover",
          }}
          alt="profile"
        />
      </Link> */}
    </div>
  );
};

export default ProfileNavigationBtn;
