import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import bg from "./assets/room not found.webp";

const RoomNotFound = () => {
  const { t } = useTranslation();

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "50px 20px",
        display: "flex",
        justifyContent: "start",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        fontSize: "20px",
        width: "100%",
        textAlign: "center",
        gap: "10px",
        color: "white",
      }}
    >
      <h3>{t("Room_not_found")}</h3>
      <Link to="/">
        <h5>{t("home")}</h5>
      </Link>
    </div>
  );
};

export default RoomNotFound;
