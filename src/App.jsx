import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import app from "./initFirebase";

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/onCall">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
