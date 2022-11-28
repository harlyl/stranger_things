import React from "react";
import { Link } from "react-router-dom";
import { deletePost } from "../api/api";

const PostsItem = ({ post, setPosts, token }) => {
  const deleteClick = async (postId) => {
    await deletePost(token, postId);
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
  };
  return (
    <div className="fluid ui card">
      <div className="content">
        <div className="center aligned header">{post.title}</div>
        <div>
          <h3 className="center aligned ui sub header">
            Author: {post.author.username}
          </h3>
        </div>
        <div className="content">
          <h5 className="center aligned ui sub header">Price: {post.price}</h5>
        </div>
        <div className="ui small feed">
          <div>Description: {post.description}</div>
        </div>
        <div>Location: {post.location}</div>
        <div className="extra content">
          <Link className="fluid ui button" to={`/Posts/${post._id}`}>
            View Post
          </Link>
        </div>
        {post.isAuthor ? (
          <button
            className="right floated aligned fluid negative ui button"
            onClick={() => deleteClick(post._id)}
          >
            Delete Post
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default PostsItem;
