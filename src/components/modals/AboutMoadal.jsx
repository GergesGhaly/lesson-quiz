import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import wrong from "../../assets/wrong.avif";
import { Link } from "react-router-dom";

const AboutMoadal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999999999,
          }}
        >
          {/* المودال */}
          <motion.div
            className="modal"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.1 }}
            style={{
              background: "#2C3E50",
              color: "white",
              padding: "30px",
              borderRadius: "16px",
              zIndex: 9999999999,
              minWidth: "300px",
              textAlign: "center",
              boxSizing: "border-box",
              border: "2px solid white",
              position: "relative",
            }}
          >
            {/* زر الإغلاق */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              style={{
                position: "absolute",
                top: "-25px",
                right: "-20px",
                background: "transparent",
                border: "none",
                outline: "none",
                cursor: "pointer",
              }}
            >
              <img
                src={wrong}
                alt="close"
                style={{ width: "60px", height: "60px" }}
              />
            </motion.button>

            {/* نص المودال */}
            <p
              style={{
                fontSize: "14px",
                lineHeight: "1.6",
                textAlign: "center",
              }}
            >
              The work would not have been completed without Michael Atef.
              <br />
              Developed by <br />
              <motion.a
                href="https://www.facebook.com/gerges.ghaly.35"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "white",
                  textDecoration: "underline",
                  fontWeight: "bold",
                  display: "inline-block",
                }}
                whileHover={{
                  scale: 1.03,
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Gerges Ghaly
              </motion.a>{" "}
              <motion.span style={{ display: "inline-block" }}>❤️</motion.span>
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AboutMoadal;
