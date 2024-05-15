import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Aboutus from "./components/Aboutus";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/about" element={<Aboutus />} />
      </Routes>
    </div>
  );
}

export default App;
