import React, { useState, useEffect } from "react";
import {
  Home,
  Posts,
  AccountForm,
  PostsCreate,
  PostMessage,
  Inbox,
} from "./components";
import { Route, Switch, Link, useHistory } from "react-router-dom";
import { fetchPosts, fetchGuest } from "./api/api";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(
    window.localStorage.getItem("token") || null
  );
  const [username, setUsername] = useState(null);

  const history = useHistory();

  useEffect(() => {
    const getPosts = async () => {
      const { error, posts } = await fetchPosts(token);

      if (error) {
        console.error(error);
      }
      setPosts(posts);
    };
    getPosts();
  }, []);

  useEffect(() => {
    if (token) {
      console.log(token);
      const getGuest = async () => {
        const { username } = await fetchGuest(token);
        console.log("RESULT", username);
        setUsername(username);
        console.log("USERNAME", username);
      };
      getGuest();
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      window.localStorage.setItem("token", token);
    } else {
      window.localStorage.removeItem("token");
    }
  }, [token]);

  const logOut = () => {
    setToken(null);
    setUsername(null);
    history.push("/");
  };

  return (
    <div className="container">
      <nav className="ui secondary menu">
        <Link className="item" style={{ color: "white" }} to="/">
          Home
        </Link>
        <Link className="item" style={{ color: "white" }} to="/Posts">
          Posts
        </Link>
        <Link className="item" style={{ color: "white" }} to="/inbox">
          Inbox
        </Link>
        <div className="right menu">
          {token ? (
            <button
              style={{ color: "white" }}
              className="ui item"
              onClick={(event) => {
                event.preventDefault();
                logOut();
              }}
            >
              Log Out
            </button>
          ) : (
            <>
              <Link
                style={{ color: "white" }}
                className="ui item"
                to="/AccountForm/login"
              >
                Log In
              </Link>
              <Link
                style={{ color: "white" }}
                className="ui item"
                to="/AccountForm/register"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
      <Switch>
        <Route exact path="/">
          <Home username={username} />
        </Route>
        <Route path="/Posts/create">
          <PostsCreate token={token} setPosts={setPosts} />
        </Route>
        <Route path="/Posts/:postId">
          <PostMessage posts={posts} token={token} />
        </Route>
        <Route path="/Posts">
          <Posts posts={posts} token={token} setPosts={setPosts} />
        </Route>
        <Route path="/AccountForm/:action">
          <AccountForm setToken={setToken} />
        </Route>
        <Route path="/Inbox">
          <Inbox token={token} posts={posts} setPosts={setPosts} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
