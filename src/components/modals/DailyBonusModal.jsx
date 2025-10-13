import React from "react";
import { motion } from "framer-motion";
import bonusImage from "../../assets/bouns.png";
import bonusbg from "../../assets/profil_bg.jpg";
import coinImage from "../../assets/coinForBounsMOdal.jpg";
import closeIcon from "../../assets/wrong.avif";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const DailyBonusModal = ({ onClose }) => {
  const { t } = useTranslation();

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100dvw",
        height: "100dvh",
        // backgroundColor: "rgba(0, 0, 0, 0.39)",
        zIndex: 9999999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.7, opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "relative",
          // background: "radial-gradient(circle, #502a63, #30103F)",
          borderRadius: "30px",
          padding: " 20px",
          textAlign: "center",
          width: "85%",
          maxWidth: "320px",
          boxShadow: "0 0 20px #000000b5",
          backgroundImage: `url(${bonusbg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "70%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* زر الخروج */}
        <motion.img
          src={closeIcon}
          alt="إغلاق"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: "absolute",
            top: "-20px",
            right: "-20px",
            width: "60px",
            height: "60px",
            cursor: "pointer",
            zIndex: 2,
          }}
        />
        <h5
          style={{
            fontSize: "25px",
            // padding: "9px",
            marginBottom: "12px",
            color: "#FFD700",
            // textShadow: "0 0 5px #FFD700",
          }}
        >
          Daily Bonus
        </h5>
        {/* صورة البونس */}
        <div
          style={{
            position: "relative",
            marginBottom: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "3px",
            }}
          >
            <img
              src={coinImage}
              alt="coin"
              style={{
                width: "60px",

                zIndex: 1,
              }}
            />
            <div
              style={{
                fontSize: "23px",
                color: "#fff",
                textShadow: "2px 2px 0 #000",
                fontWeight: "bold",
                // marginBottom: "25px",
              }}
            >
              15x
            </div>
          </div>

          <img
            src={bonusImage}
            alt="bonus"
            style={{
              width: "100%",
              maxWidth: "150px",
              margin: "0 auto",
              display: "block",
              // borderRadius: "30px",
              // boxShadow: "0 0 15px #000000",
              textShadow: "2px 2px 0 #000",
            }}
          />
          <p
            style={{
              color: "#FFD700",
              fontWeight: "bold",
              fontSize: "14px",
              marginTop: "3px",
            }}
          >
            {t("bouns-modal-info")}
          </p>
          {/* زر الحصول الآن */}
          <Link
            to="/BuildTheVerse"
            //   onClick={onClaim}
            whileTap={{ scale: 0.9 }}
            style={{
              backgroundColor: "#FFD700",
              color: "#ffffff",
              fontSize: "20px",
              fontWeight: "bold",
              border: "none",
              borderRadius: "15px",
              padding: "12px 25px",
              cursor: "pointer",
              boxShadow: "0 0 15px #FFD700",
              marginTop: "10px",
            }}
          >
            {" "}
            {t("get-now")}
          </Link>
        </div>

        {/* عدد العملات */}
      </motion.div>
    </div>
  );
};

export default DailyBonusModal;
