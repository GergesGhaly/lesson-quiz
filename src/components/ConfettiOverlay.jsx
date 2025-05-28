import React from "react";
import Confetti from "react-confetti";
import NextLevelBtn from "./NextLevelBtn";

export default function ConfettiOverlay({ show }) {
  if (!show) return null;

  return (
    <>
      <Confetti />
      <NextLevelBtn />
    </>
  );
}
