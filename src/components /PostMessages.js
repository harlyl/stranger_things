import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PostsItem from "./PostsItem";
import { sendMessage } from "../api/api";

const PostMessage = ({ posts, token }) => {
  const { postId } = useParams();
  const [message, setMessage] = useState("");

  const messageSubmit = async (event) => {
    event.preventDefault();

    const { success, error, data } = await sendMessage(token, postId, message);

    if (success) {
      setMessage("");
      console.log("Successfully sent message!");
    } else {
      alert("Message unsuccessful!");
      console.error(error);
    }
  };

  const postDetail = posts.find((aPost) => {
    const foundPost = aPost._id == postId;
    return foundPost;
  });
  if (!postDetail) {
    return "Loading...";
  } else {
    return (
      <>
        <PostsItem post={postDetail} />
        <form onSubmit={messageSubmit}>
          <input
            type="text"
            placeholder="Write a message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </>
    );
  }
};

export default PostMessage;
