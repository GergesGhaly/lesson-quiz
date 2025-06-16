// App.js
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./Home";
import Profile from "./Profile";
import ChooseTestPage from "./ChooseTestPage";
import StartPage from "./StartPage";
import StartMatch from "./StartMatch";
import PlayerDataUi from "./PlayerDataUi";
import EnterRoomCodePage from "./EnterRoomCodePage";
import ChoosMatchMood from "./ChoosMatchMood";
import WatingRoom from "./WatingRoom";

function AnimatedRoutes() {
  const location = useLocation();
  const playerName = localStorage.getItem("playerName");
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageWrapper>
              <StartPage />
            </PageWrapper>
          }
        />
        <Route
          path="/ChooseTest"
          element={
            <PageWrapper>
              <ChooseTestPage />
            </PageWrapper>
          }
        />
        <Route
          path="/quiz/:quizId"
          element={
            <PageWrapper>
              <Home />
            </PageWrapper>
          }
        />

        <Route
          path="/profile"
          element={
            <PageWrapper>
              <Profile />
            </PageWrapper>
          }
        />
        {/* <Route path="/waitingRoom" element={<WatingRoom />} /> */}
        <Route path="/EnterRoomCodePage" element={<EnterRoomCodePage />} />
        <Route
          path="/competition"
          element={
            playerName ? (
              <PageWrapper>
                <StartMatch />
              </PageWrapper>
            ) : (
              <PageWrapper>
                <PlayerDataUi />
              </PageWrapper>
            )
          }
        />
        <Route
          path="/ChoosMatchMood"
          element={
            playerName ? (
              <PageWrapper>
                <ChoosMatchMood />
              </PageWrapper>
            ) : (
              <PageWrapper>
                <PlayerDataUi />
              </PageWrapper>
            )
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

const pageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1 },
  out: { opacity: 0 },
};

const pageTransition = {
  duration: 0.5,
  ease: "easeInOut",
};

const PageWrapper = ({ children }) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
    style={{ position: "absolute", width: "100%" }}
  >
    {children}
  </motion.div>
);

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
