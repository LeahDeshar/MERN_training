import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllUsers, getCurrentUser } from "../redux/Features/auth/authAction";
import { useEffect } from "react";

function Home() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(getAllUsers());
  }, [dispatch]);
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
