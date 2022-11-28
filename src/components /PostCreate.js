import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createPost } from "../api/api";

const PostsCreate = ({ token, setPosts }) => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [willDeliver, setWillDeliver] = useState(false);

  return (
    <div className="ui inverted segment">
      <form
        className="ui inverted form"
        onSubmit={async (event) => {
          event.preventDefault();

          const { error, post } = await createPost(
            token,
            title,
            description,
            location,
            price,
            willDeliver
          );

          if (post) {
            setPosts((prevPosts) => [...prevPosts, post]);
            setDescription("");
            setTitle("");
            setPrice("");
            setLocation("");
            setWillDeliver(false);
            history.push("/Posts");
            console.error(error);
          }
        }}
      >
        <h4>Create a Post</h4>
        <div className="field">
          <label htmlFor="title">Title</label>
          <input
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            value={title}
            type="text"
            placeholder="Title your post"
            required
          ></input>
        </div>

        <div className="field">
          <label htmlFor="description">Description</label>
          <input
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            value={description}
            type="text"
            placeholder="Quick description of post"
            required
          ></input>
        </div>

        <div className="field">
          <label htmlFor="location">Location</label>
          <input
            value={location}
            type="text"
            placeholder="Where are you?"
            onChange={(event) => {
              setLocation(event.target.value);
            }}
          ></input>
        </div>

        <div className="field">
          <label htmlFor="price">Price</label>
          <input
            value={price}
            type="text"
            placeholder="Name your price"
            required
            onChange={(event) => {
              setPrice(event.target.value);
            }}
          ></input>
        </div>

        <div className="inline field">
          <div className="ui checkbox">
            <label htmlFor="willDeliver">Can you deliver?</label>
            <input
              value={willDeliver}
              type="checkbox"
              onChange={(event) => {
                setWillDeliver(event.target.value);
              }}
            ></input>
          </div>
        </div>

        <button className="ui submit button" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default PostsCreate;
