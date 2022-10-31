import React from "react";
import Postsitem from "./Postsitem";


const Posts = ({ posts }) => {
    console.log("posts", posts);
    return (
<div>
    {posts.map ((item) => {
        return <Postsitem key={item._id} post={item}/>
    }) };
</div>
);
    
};

export default Posts; 