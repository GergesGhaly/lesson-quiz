import React from "react";
import { motion, AnimatePresence } from "framer-motion";
// import { FaMusic, FaVolumeUp, FaLanguage, FaTimes } from "react-icons/fa";

const SettingsModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* الخلفية الداكنة */}
          <motion.div
            className="backdrop"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              height: "100vh",
              width: "100%",
              backgroundColor: "black",
              zIndex: 1000,
            }}
          />

          {/* المودال */}
          <motion.div
            className="modal"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.1 }}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "#2C3E50",
              color: "white",
              padding: "30px",
              borderRadius: "16px",
              zIndex: 1001,
              minWidth: "300px",
              textAlign: "center",
              //   boxSizing: "border-box",
              //   border: "2px solid red",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <h2>⚙️ الإعدادات</h2>
              <button onClick={onClose} style={iconButtonStyle}>
                {/* <FaTimes size={20} /> */}
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <button style={settingButtonStyle}>
                {/* <FaMusic size={24} /> الموسيقى */}
              </button>
              <button style={settingButtonStyle}>
                {/* <FaVolumeUp size={24} /> الأصوات */}
              </button>
              <button style={settingButtonStyle}>
                {/* <FaLanguage size={24} /> تغيير اللغة */}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const settingButtonStyle = {
  background: "#34495E",
  color: "white",
  padding: "12px 20px",
  borderRadius: "10px",
  border: "none",
  fontSize: "16px",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  justifyContent: "center",
  cursor: "pointer",
};

const iconButtonStyle = {
  background: "transparent",
  border: "none",
  color: "white",
  cursor: "pointer",
};

export default SettingsModal;
