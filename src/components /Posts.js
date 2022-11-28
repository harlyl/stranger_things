import React, { useEffect, useState } from "react";
import PostsItem from "./PostsItem";
import { Link } from "react-router-dom";

const Posts = ({ posts, setPosts, token }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(posts);
  console.log(posts);
  useEffect(() => {
    if (searchTerm) {
      const searchTerms = searchTerm.toLowerCase().split(" ");
      const filter = posts.filter((searchPosts) => {
        console.log("SEARCHES", searchPosts);
        const values = [
          searchPosts.title,
          searchPosts.location,
          searchPosts.author.username,
          searchPosts.description,
          searchPosts.price,
        ];
      });
      setFilteredPosts(filter);
    } else {
      setFilteredPosts(filteredPosts);
    }
  }, [searchTerm, posts]);

  return (
    <>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <Link className="fluid ui button" to="/Posts/create">
        Create a Post
      </Link>
      <div id="posts">
        {posts.map((post) => {
          // console.log("hi", post)
          return (
            <PostsItem
              key={post._id}
              post={post}
              setPosts={setPosts}
              token={token}
            />
          );
        })}
      </div>
    </>
  );
};

export default Posts;
