import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createAvatar,
  followUser,
  getAllUsers,
  getCurrentUser,
  unfollowUser,
} from "../redux/Features/auth/authAction";
import store from "../redux/store";
import { io } from "socket.io-client";

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

// export const Users = () => {
//   const { users } = useSelector((state: any) => state.auth);
//   const { user } = useSelector((state: any) => state.auth);
//   const [notifications, setNotifications] = useState<string[]>([]);
//   let userId = "";
//   if (user) {
//     userId = user?._id;
//   }

//   useEffect(() => {
//     const socket = io("http://localhost:8080"); // Replace with your backend URL

//     if (userId) {
//       socket.emit("register", userId);
//     }

//     socket.on("follow", (data) => {
//       if (data.followedId === userId) {
//         setNotifications((prevNotifications) => [
//           ...prevNotifications,
//           `User ${data.followerId} started following you`,
//         ]);
//         console.log("follow", data);
//       }
//     });
//     return () => {
//       socket.disconnect();
//     };
//   }, [userId]);

//   const dispatch = useDispatch();

//   const handleFollowButton = async (id) => {
//     await dispatch(followUser(id)).unwrap();
//     console.log("follow button clicked", id);
//   };
//   return (
//     <div>
//       <p
//         style={{
//           fontSize: "2rem",
//           fontWeight: "bold",
//         }}
//       >
//         Users
//       </p>
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "row",
//         }}
//       >
//         {users?.map((user) => (
//           <div
//             key={user._id}
//             style={{
//               marginInline: 10,
//             }}
//           >
//             <p>{user.username}</p>
//             <button onClick={() => handleFollowButton(user._id)}>Follow</button>
//           </div>
//         ))}
//       </div>

//       <div>
//         <h3>Notifications</h3>
//         {notifications?.map((notification, index) => (
//           <p key={index}>{notification}</p>
//         ))}
//       </div>
//     </div>
//   );
// };

export const Users = () => {
  const { users } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [followedUsers, setFollowedUsers] = useState<string[]>([]); // Track followed users
  const dispatch = useDispatch();

  let userId = user?._id || "";

  useEffect(() => {
    const socket = io("http://localhost:8080"); // Replace with your backend URL

    if (userId) {
      socket.emit("register", userId);
    }

    socket.on("follow", (data) => {
      if (data.followerId === userId) {
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          `User ${data.followerId} started following you`,
        ]);
        console.log("follow", data);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  const handleFollowButton = async (id: string) => {
    if (followedUsers.includes(id)) {
      await dispatch(unfollowUser(id)).unwrap();
      setFollowedUsers(followedUsers.filter((userId) => userId !== id));
    } else {
      await dispatch(followUser(id)).unwrap();
      setFollowedUsers([...followedUsers, id]);
    }
    console.log("Follow/unfollow button clicked", id);
  };

  return (
    <div>
      <p style={{ fontSize: "2rem", fontWeight: "bold" }}>Users</p>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {users?.map((otherUser) => (
          <div key={otherUser._id} style={{ marginInline: 10 }}>
            <p>{otherUser.username}</p>
            {otherUser._id !== userId && ( // Hide the button for the current user
              <button onClick={() => handleFollowButton(otherUser._id)}>
                {followedUsers.includes(otherUser._id) ? "Unfollow" : "Follow"}
              </button>
            )}
          </div>
        ))}
      </div>

      <div>
        <h3>Notifications</h3>
        {notifications?.map((notification, index) => (
          <p key={index}>{notification}</p>
        ))}
      </div>
    </div>
  );
};