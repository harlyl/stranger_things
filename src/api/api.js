const BASEURL = "https://strangers-things.herokuapp.com/api/2207-FTB-ET-WEB-PT";

const makeHeaders = (token) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

const callAPI = async (path, givenOptions = {}) => {
  const { token, method, body } = givenOptions;

  const options = {
    headers: makeHeaders(token),
  };

  if (method) {
    options.method = givenOptions.method;
  }

  if (body) {
    options.body = JSON.stringify(givenOptions.body);
  }

  const response = await fetch(`${BASEURL}${path}`, options);
  const result = await response.json();

  return result;
};

export const fetchPosts = async (token) => {
  try {
    const { success, error, data } = await callAPI(`/posts`, {
      token: token,
    });

    if (success) {
      return {
        error: null,
        posts: data.posts,
      };
    } else {
      return {
        error: error.message,
        posts: [],
      };
    }
  } catch (error) {
    console.error("Error fetching posts", error);

    return {
      error: "Failed to load posts",
      posts: [],
    };
  }
};

export const fetchRegister = async (username, password) => {
  try {
    const { success, error, data } = await callAPI("/users/register", {
      method: "POST",
      body: {
        user: {
          username,
          password,
        },
      },
    });

    if (success) {
      return {
        error: null,
        token: data.token,
        message: data.message,
      };
    } else {
      return {
        error: error.message,
        token: null,
        message: null,
      };
    }
  } catch (error) {
    console.error("Error registering new user", error);

    return {
      error: "Error registration failed",
      token: null,
      message: null,
    };
  }
};

export const fetchLogin = async (username, password) => {
  try {
    const { success, error, data } = await callAPI("/users/login", {
      method: "POST",
      body: {
        user: {
          username,
          password,
        },
      },
    });

    if (success) {
      return {
        error: null,
        token: data.token,
        message: data.message,
      };
    } else {
      return {
        error: error.message,
        token: null,
        message: null,
      };
    }
  } catch (error) {
    console.error("There was an error logging in", error);
  }
};

export const fetchGuest = async (token) => {
  try {
    const { success, error, data } = await callAPI("/users/me", {
      token: token,
    });
    console.log("DATA", data);
    if (success) {
      return {
        error: null,
        username: data.username,
        message: data.message,
      };
    } else {
      return {
        error: error.message,
        data: null,
      };
    }
  } catch (error) {
    console.error("Failed to fetch guest!", error);

    return {
      error: "Failed to guest",
      data: null,
    };
  }
};

export const createPost = async (
  token,
  title,
  description,
  location,
  price,
  willDeliver
) => {
  try {
    const { success, error, data } = await callAPI("/posts", {
      token: token,
      method: "POST",
      body: {
        post: {
          title,
          description,
          location,
          price,
          willDeliver,
        },
      },
    });

    if (success) {
      return {
        error: null,
        post: data.post,
      };
    } else {
      return {
        error: error.message,
        post: null,
      };
    }
  } catch (error) {
    console.error("POST /post failed", error);

    return {
      error: "Failed to create Post",
      post: null,
    };
  }
};

export const deletePost = async (token, postId) => {
  try {
    const { success, error, data } = await callAPI(`/posts/${postId}`, {
      method: "DELETE",
      token,
    });

    if (success) {
      return {
        error: null,
        data: null,
      };
    } else {
      return {
        error: error.message,
        data: null,
      };
    }
  } catch (error) {
    console.error("there was an error deleting this post", error);

    return {
      error: "Could not delete vacation",
      data: null,
    };
  }
};

export const sendMessage = async (token, postId, message) => {
  try {
    const { success, error, data } = await callAPI(
      `/posts/${postId}/messages`,
      {
        token: token,
        method: "POST",
        body: {
          message: {
            content: message,
          },
        },
      }
    );

    if (success) {
      return {
        success: success,
        error: null,
        data: data.message,
      };
    } else {
      return {
        success: success,
        error: error.message,
        data: null,
      };
    }
  } catch (error) {
    console.error("Could not comment", error);

    return {
      success: false,
      error: error.message,
      data: null,
    };
  }
};

export const editPost = async (
  token,
  postId,
  title,
  description,
  price,
  location,
  willDeliver
) => {
  try {
    const { success, error, data } = await callAPI(`/posts/${postId}`, {
      token: token,
      method: "PATCH",
      body: {
        post: {
          title,
          description,
          price,
          location,
          willDeliver,
        },
      },
    });

    if (success) {
      return {
        error: null,
        data: data.post,
      };
    } else {
      return {
        error: error.message,
        data: null,
      };
    }
  } catch (error) {
    console.error("There was an error editing this post", error);

    return {
      error: "Could not edit Post",
      data: null,
    };
  }
};
