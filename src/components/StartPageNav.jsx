import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import profileBtn from "../assets/buttons/profileBtn.avif";
import aboutBtn from "../assets/buttons/aboutBtn.avif";
import qr from "../assets/buttons/qr-icon.png";

const StartPageNav = ({ setShowAbout, setQrModalOpen }) => {
  return (
    <div
      style={{
        width: "100%",

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

            objectFit: "cover",
          }}
          alt="profile"
        />
      </Link>
      <motion.img
        whileHover={{ scale: 1.1 }}
        src={qr}
        onClick={() => setQrModalOpen(true)}
        style={{
          width: "45px",
          objectFit: "cover",
          borderRadius: "40%",
        }}
        alt="profile"
      />

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
