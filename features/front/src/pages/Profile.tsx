import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createAvatar,
  getAllUsers,
  getCurrentUser,
} from "../redux/Features/auth/authAction";
import store from "../redux/store";

function Profile() {
  // access the data from redux store
  const { user } = useSelector((state: any) => state.auth);
  console.log(user);
  return (
    <div>
      <p
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
        }}
      >
        Profile
      </p>
      <p>{user?.username}</p>
      <p>{user?.email}</p>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p>Followers: {user?.followers.length}</p>
        <p>Following: {user?.following.length}</p>
      </div>
      <AvatarUpload />
      <Users />
    </div>
  );
}

export default Profile;

const AvatarUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    setLoading(true); // Start loading state
    setError(null); // Reset any previous error

    try {
      await dispatch(createAvatar(formData)).unwrap(); // unwrap will throw an error if rejected

      // If successful, get the current user again
      await dispatch(getCurrentUser()).unwrap(); // Assuming you want to unwrap here as well
      setLoading(false);
    } catch (err) {
      // Display a string message from the error object
      setError(err.message || "Something went wrong!"); // Ensure it's a string
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="avatar-upload">
      {user?.profilePic?.url && (
        <img
          src={user.profilePic.url}
          alt="Current Profile Pic"
          style={{
            width: 100,
            height: 100,
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
      )}
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>
      {error && <p className="error-message">{error}</p>}{" "}
      {/* Ensure error is a string */}
    </div>
  );
};

// component to show all the users with follow button
export const Users = () => {
  const { users } = useSelector((state: any) => state.auth);

  return (
    <div>
      <p
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
        }}
      >
        Users
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        {users?.map((user) => (
          <div
            key={user._id}
            style={{
              marginInline: 10,
            }}
          >
            <p>{user.username}</p>
            <button>Follow</button>
          </div>
        ))}
      </div>
    </div>
  );
};
