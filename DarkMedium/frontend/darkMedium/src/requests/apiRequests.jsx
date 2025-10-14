import { useContext } from "react";
import { AppContext } from "../AppContext";
import { useNavigate } from "react-router-dom";


// const { isLoggedIn, setLoggedIn } = useContext(AppContext)
//const { user, setUser } = useContext(AppContext);
// const navigate = useNavigate()



export async function deleteHandler(blogId_user) {
  try {
    let { blogId, user } = blogId_user;
    console.log('blogId_user : ', blogId_user)
    let url = 'http://localhost:3003/api/v1/blog/delete?blogId=' + blogId + '&userId=' + user.id;
    console.log('url : ', url)
    let res = await fetch(url, {
      method: "DELETE",
    })
    let data = await res.json();
    console.log('data from deleted blogs : ', data)
    if (data.success) {
      alert('blog deleted.')
      return data;
    }
  } catch (error) {
    console.log('blog not deleted some error occured : ', error)
  }
}


//api request to fetch user specific blogs: for Profile

export async function fetchUserBlogs(token) {
  console.log("token :", token)
  try {
    let res = await fetch('http://localhost:3003/api/v1/blog/userBlogs', {
      method: "GET",
      headers: {
        'token': token
      }
    })
    let data = await res.json();
    console.log('data from fetched blogs for user \n', data)
    console.log('blogs : ', data.blogs)
    return data.blogs.blogs;
  } catch (error) {
    console.log('some error occured while fetching blogs.')

  }
}


//api request to fetch all blogs: for mainFrame

export async function fetchAllBlogs() {
  try {
    let res = await fetch('http://localhost:3003/api/v1/blog/allBlogs')
    let data = await res.json();
    console.log('blogs : ', data.blogs)
    return data.blogs;
  } catch (error) {
    console.log('some error occured while fetching blogs.', error);
    throw error;

  }
}


//api request to signout user: for sidebar


export async function signoutHandler() {
  try {
    let res = await fetch('http://localhost:3003/api/v1/user/signout', {
      method: 'POST',
    })
    let data = await res.json();
    console.log('data from signout route : ', data)
    if (data.success) {
      setLoggedIn(false);
      navigate('/')
    }
  } catch (error) {
    console.log('error while sign out : ', error);
  }
}


//api request to signin user: for login 

export async function signinHandler(email_password) {
  try {
    let input = {
      email: email_password.email,
      password: email_password.password
    }
    console.log(input)
    let url = 'http://localhost:3003/api/v1/user/signin';
    let res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input)
    })

    let data = await res.json();
    console.log('response from server \n', data)
    console.log(data.success)
    if (data.success) {
      return data;
    }

  } catch (error) {
    console.log('error while login : ', error)
  }
}


//api request to signup user: for signup

export async function signupHandler(input_data) {
  try {
    let input = {
      email: input_data.email,
      username: input_data.username,
      password: input_data.password
    }
    console.log(input)
    let url = 'http://localhost:3003/api/v1/user/signup';
    let res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input)
    })

    let data = await res.json();
    console.log('response from server \n', data)
    console.log(data.success)
    if (data.success) {
      return data;
    }


  } catch (error) {
    console.log('error while signup : ', error)
  }
}

