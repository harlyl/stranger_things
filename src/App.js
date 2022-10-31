import React, {useState, useEffect} from "react";
import {Home, Posts, AccountForm} from "./components ";
import {Route, Switch, Link, useHistory} from "react-router-dom";
import { fetchPosts, fetchGuests } from "./api/api";
import "./App.css";


const App = () => {
    const [posts, setPosts] = useState([]);
    const [token, setToken] = useState(window.localStorage.getItem("token") || ""
    );

    const [guest, setGuest] = useState(null);
    const history = useHistory();

    useEffect(() => {
        const getPosts = async () => {
            try {
                const result = await fetchPosts()
                setPosts(result)
                console.log("result" , result)
            } catch(error){
                console.error(error)
            }
        };
        getPosts();
    }, []);


// useEffect(() => {
    // if (token) {
        // const getGuest = async() => {
            // const {guest} = await fetchGuests(token);
            // console.log("guest", guest);
            // setGuest(guest.username)
        // };
        // getGuest();
    // }
// }, [token])


    useEffect(() => {
        window.localStorage.setItem("token", token)
    }, [token])

    const logOut = () => {
        setToken("")
        setGuest(null)
        history.push("/")
    }

 return (
    <div className="container">
        <nav className="ui secondary menu">
            <Link className="item" to ="/">Home</Link>
            <Link className="item" to="/Posts">Posts</Link>
            <div className="right menu">
               {token ? (
                <button  onClick={logOut} className="item">Log out </button>
               ) : (
                <>
            <Link className="item" to="/Account/login">login</Link>
            <Link className="item" to="/Account/register">sign up</Link>
            </>
               )}
            </div>
        </nav>
        <Switch>
            <Route exact path ="/">
                <Home guest={guest} />
            </Route>
            <Route className="item" path="/Posts">
                 <Posts posts={posts}/>
            </Route>
            <Route className="item" path="/Account/:action">
                <AccountForm setToken={setToken}/>
            </Route>
        </Switch>
        
        
    </div>
    );
};

export default App;
