import React from 'react'

const Postsitem = ({post}) => {
    console.log(post)
    return (
        
        <div className="ui card">
           
           <h1 >{post.title}</h1>
            <p >{post.description}</p>
        </div>
       
    )
};

export default Postsitem;