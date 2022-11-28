import React from "react";
import InboxItem from "./InboxItem";

const Inbox = ({ token, posts, setPosts }) => {
  return (
    <>
      <div className="ui comment">
        {posts.messages !== [] ? (
          posts.map((post) => {
            console.log("KEYSEARCH", post);
            return (
              <InboxItem
                key={post._id}
                post={post}
                setPosts={setPosts}
                token={token}
              />
            );
          })
        ) : (
          <h3>Your Inbox is empty!</h3>
        )}
      </div>
    </>
  );
};

export default Inbox;
