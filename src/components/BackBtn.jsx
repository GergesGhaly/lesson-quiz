import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const BackBtn = () => {
  //   const { t } = useTranslation();

  return (
    <Link
      to="/"
      style={{
        position: "absolute",
        top: "10px",
        left: "20px",

        background: "#4CAF50",
        width: "content",
        // maxWidth: "300px",
        color: "white",
        padding: "10px 20px",
        fontSize: "18px",
        marginTop: "20px",
        borderRadius: "12px",
        border: "none",
        cursor: "pointer",
        zIndex: 9999,
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      }}
    >
      <motion.button
        whileTap={{ scale: 0.9 }}
        style={{
          background: "transparent",
          color: "white",
          border: "none",
          cursor: "pointer",
          fontWeight: "900",
        }}
      >
        {"<"}
      </motion.button>
    </Link>
  );
};

export default BackBtn;
