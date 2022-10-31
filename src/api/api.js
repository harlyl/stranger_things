 const BASEURL = " https://strangers-things.herokuapp.com/api/2207-FTB-ET-WEB-PT";


 export const fetchPosts = async () => {
    try {
    const response = await fetch(`${BASEURL}/posts`)
    console.log("----this response------", response);
    const {data} = await response.json();
    console.log("This is data", data.posts);
    return data.posts;
    } catch(error) {
        console.error("there was an error fetching posts", error);
    }
 };


 export const registerUser = async(username, password) => {
    try {
    const response = await fetch (`${BASEURL}/users/register`, {
    method: "POST",
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    user: {
      username: username,
      password: password,
    },
  }),
});
console.log("Response---->", response)
const data = await response.json();
console.log("------data--------", data)
return data;
} catch(error)  {
    console.error("there is an error registering user", error);
}


 };

 export const fetchGuests = async(token) => {
    try{
const response = await fetch (`${BASEURL}/users/me`, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` ,  
      },
});
console.log("USER response -------", response);
const {data} = await response.json();
console.log("user data----->", data);
    }catch {
console.log(error);
    }
 }