import React, { useState } from "react";

const InboxItem = ({ token, post }) => {
  return (
    <>
      {post.isAuthor && token ? (
        <div className="ui centered fluid cards">
          <div className="">
            <div className="ui fluid comments">
              <div className="comment">
                {post.messages.map((message) => {
                  return (
                    <div className="content" key={message._id}>
                      <div className="author">{message.fromUser.username}</div>
                      <div className="text">{message.content}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default InboxItem;
