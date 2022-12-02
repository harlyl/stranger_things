import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { addMessage } from "../api/api";
import PostsItem from "./PostsItem";

const PostDetail = (props) => {
  const { token, post, getPosts } = props;
  const { postId } = useParams();
  const [commentText, setCommentText] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const singlePost = post.find((onePost) => {
    const foundPost = onePost._id == postId;
    return foundPost;
  });

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const { success, error, message } = await addMessage(
      token,
      postId,
      commentText
    );

    if (success) {
      setCommentText("");

      await getPosts();
    } else {
      setErrorMessage(error);
    }
  };

  if (!singlePost) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <PostsItem post={singlePost} />
      <form className="comment-form" onSubmit={handleOnSubmit}>
        <input
          type="text"
          placeholder="New Comment"
          value={commentText}
          onChange={(event) => setCommentText(event.target.value)}
        />
        <button type="submit">Send</button>
        {errorMessage ? (
          <p style={{ color: "red", backgroundColor: "pink" }}>
            Operation Failed: {errorMessage}
          </p>
        ) : null}
      </form>
    </>
  );
};

export default PostDetail;
