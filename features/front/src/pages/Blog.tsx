import React, { useEffect, useState } from "react";
import {
  getAllPostByUser,
  postCreation,
} from "../redux/Features/blog/blogAction";
import { useDispatch, useSelector } from "react-redux";

function Blog() {
  const { posts } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const [postData, setPosts] = useState([]);

  useEffect(() => {
    dispatch(getAllPostByUser());
  }, [dispatch]);

  return (
    <div>
      <h1>Create a Post</h1>
      <CreatePost />
      <PostList posts={posts} dispatch={dispatch} />
    </div>
  );
}

export default Blog;
const CreatePost = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    dispatch(getAllPostByUser());
  }, [dispatch]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !image) {
      setError("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("file", image);

    try {
      setLoading(true);
      setError(null);
      // using dispatch
      dispatch(postCreation(formData)).unwrap();

      setTitle("");
      setContent("");
      setImage(null);
      dispatch(getAllPostByUser()).unwrap();

      // } else {
      //   setError(response.data.msg);
      // }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post">
      <h2>Create a New Post</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <textarea
            placeholder="Write your post content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            required
          ></textarea>
        </div>
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        <div>
          <button type="submit" disabled={loading}>
            {loading ? "Posting..." : "Create Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

// PostList component to display posts with comments and reactions
const PostList = ({ posts, dispatch }) => {
  useEffect(() => {
    dispatch(getAllPostByUser());
  }, [dispatch]);

  return (
    <div>
      {posts?.posts?.map((post, index) => (
        <>
          <div
            key={index}
            style={{
              backgroundColor: "gray",
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
            }}
          >
            <p>{post.title}</p>
            <p>{post.content}</p>
            {post.postImage && (
              <img
                style={{
                  width: "100px",
                  height: "100px",
                }}
                src={post.postImage?.url}
                alt={post.title}
              />
            )}
          </div>
          <div
            style={{
              backgroundColor: "gray",
            }}
          >
            <button>Like</button>
            <button>Comment</button>
          </div>
        </>
      ))}
    </div>
  );
};
