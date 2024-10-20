import { Link, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <Link to="/about" className="btn btn-primary">
        About
      </Link>
      <Link to="/profile">Profile</Link>
    </div>
  );
}

export default Home;
