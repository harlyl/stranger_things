import React from "react";
import { Link } from "react-router-dom";

const PostsItem = ({ post, headerElement, children }) => {
  return (
    <div className="ui card">
      <div className="content">
        <div className="left floated aligned header">{post.location}</div>
        {headerElement}
        <div className="centered aligned description">
          <p>{post.description}</p>
          <div className="extra content">
            <div className=" center aligned header">
              <Link to={`/posts/${post._id}`}>View Location</Link>
            </div>
          </div>
        </div>
        {children}
        <div
          role="list"
          className="ui divided relaxed list"
          style={{ color: "#444", clear: "both" }}
        >
          {post.messages.map((message) => {
            return (
              <div key={message.id} role="listitem" className="item">
                <b>{message.username}</b>
                <p className="content">{message.content}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PostsItem;
