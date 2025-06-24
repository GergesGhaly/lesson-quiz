import React, { useRef } from "react";
import QRCode from "react-qr-code";
import wrong from "../assets/wrong.avif";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const GameQrLink = ({ isQrModalOpen, setQrModalOpen }) => {
  const { t } = useTranslation();

  const svgRef = useRef(null);
  const currentUrl = window.location.href;

  const downloadQRCode = () => {
    const svg = svgRef.current;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = 200;
      canvas.height = 200;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = pngFile;
      a.download = "sword-and-shield-qr.png";
      a.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <>
      {isQrModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999999,
          }}
        >
          <div
            style={{
              position: "relative", // ضروري لزر الإغلاق
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              backgroundColor: "#2C3E50",
              padding: "20px",
              borderRadius: "10px",
              textAlign: "center",
              width: "300px",
              boxShadow: "0 0 10px rgba(0,0,0,0.3)",
            }}
          >
            {/* زر الإغلاق في أعلى يمين المودال */}
            <motion.button
              onClick={() => setQrModalOpen(false)}
              whileTap={{ scale: 0.9 }}
              style={{
                position: "absolute",
                top: "-25px",
                right: "-25px",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                padding: 0,
                zIndex: 10,
              }}
            >
              <motion.img
                src={wrong}
                alt="إغلاق"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                style={{
                  width: "60px",
                  height: "60px",
                }}
              />
            </motion.button>

            <h3 style={{ color: "white" }}> {t("share")}</h3>

            <div
              style={{
                background: "#ffffff",
                padding: "16px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "10px",
              }}
            >
              <QRCode value={currentUrl} size={200} ref={svgRef} />
            </div>

            <p style={{ marginTop: "10px", color: "white",textAlign:"center" }}>{currentUrl}</p>

            <button
              onClick={downloadQRCode}
              style={{
                marginTop: "10px",
                padding: "10px 20px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {t("download")}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GameQrLink;
