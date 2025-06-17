import { motion } from "framer-motion";

const GlowingScore = ({ score, highlight }) => {
  return (
    <motion.h4
      initial={{ color: "#fff" }}
      animate={
        highlight
          ? {
              color: "#FFD700",
              textShadow: [
                "0 0 5px #FFD700",
                "0 0 10px #FFD700",
                "0 0 20px #FFA500",
              ],
            }
          : {
              color: "#fff",
              textShadow: "none",
            }
      }
      transition={{
        repeat: highlight ? Infinity : 0,
        repeatType: "reverse",
        duration: 0.5,
        ease: "easeInOut",
      }}
      style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}
    >
      {score}
    </motion.h4>
  );
};

export default GlowingScore;
