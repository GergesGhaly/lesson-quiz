import "./App.css";
import Home from "./Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartPage from "./StartPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/quiz/:quizId" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
