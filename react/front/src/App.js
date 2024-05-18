import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Aboutus from "./components/Aboutus";
import Users from "./components/Users";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import UserProfile from "./components/UserProfile";
import SearchUser from "./components/SearchUser";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/" exact element={<Home />} />
          <Route path="/about" element={<Aboutus />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/user/:username" element={<UserProfile />} />
          <Route path="/search" element={<SearchUser />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
