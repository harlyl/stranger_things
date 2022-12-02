import PostsItem from "./PostsItem";
import { Link } from "react-router-dom";
import { deletePost } from "../api/api";
import React, { useEffect, useState } from "react";

const Posts = ({ posts, setPosts, token }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(posts);

  useEffect(() => {
    if (searchTerm) {
      const searchTerms = searchTerm.toLocaleLowerCase().trim().split(" ");
      const filtered = posts.filter((postObject) => {
        const filterableValues = [postObject.description, postObject.location];

        for (let value of filterableValues) {
          const valueLower = value.toLocaleLowerCase().trim();

          for (let term of searchTerms) {
            if (
              valueLower.length > 0 &&
              term.length > 0 &&
              valueLower.includes(term)
            ) {
              return true;
            }
          }
        }

        return false;
      });
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [searchTerm, posts]);

  const handleDeleteClick = async (postid) => {
    await deletePost(token, postid);
    setPosts((prevPosts) => prevPosts.filter((posts) => posts._id != postid));
  };

  return (
    <>
      <div className="ui icon input">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        ></input>
        <i className="search icon"></i>
      </div>
      <Link to="/posts/create" className="ui button">
        Create Post
      </Link>
      <div className="posts-container">
        {filteredPosts.map((item) => {
          return (
            <PostsItem
              key={item._id}
              post={item}
              headerElement={
                item.isAuthor ? (
                  <div className="right floated aligned tiny header">Mine</div>
                ) : null
              }
            >
              {item.isAuthor ? (
                <button
                  onClick={() => handleDeleteClick(item._id)}
                  className="negative ui button left floated"
                >
                  Delete
                </button>
              ) : null}
            </PostsItem>
          );
        })}
        ;
      </div>
    </>
  );
};

export default Posts;
