import { useNavigate } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { AppContext } from "../AppContext";
import { signinHandler } from "../requests/apiRequests";
import { useMutation } from "@tanstack/react-query";

export function Login() {

  const navigate = useNavigate()
  const [active, setActive] = useState(false);
  const { setUser, isLoggedIn, setLoggedIn } = useContext(AppContext)

  const emailRef = useRef('');
  const passwordRef = useRef('');

  function changeHandler(event) {
    if (event.target.name == 'email') {
      emailRef.current = event.target.value;
    }
    if (event.target.name == 'password') {
      passwordRef.current = event.target.value;
    }
  }

  const { mutate } = useMutation({
    mutationFn: (email_password) => signinHandler(email_password),
    onSuccess: (data) => {
      setLoggedIn(true);
      console.log('isLoggedIn value after : ', isLoggedIn)
      setUser({
        username: data.user.username,
        email: data.user.email,
        id: data.user._id,
        blogs: data.user.blogs,
        collection: data.user.collection,
        favourites: data.user.favourites,
        liked: data.user.liked,
        tags: data.user.tags,
        token: data.token
      })
      navigate('/home')
      alert('login success')
    },
    onError: (error) => {
      console.log("error while signing out : ", error)
    }
  })

  function clickHandler() {
    let email_password = {
      email: emailRef.current,
      password: passwordRef.current
    }
    mutate(email_password)
  }


  function activeHandler(event) {
    if (event.target.id == 'loginParent') {
      setActive((prev) => !prev)
      navigate('/')
    }
  }


  return (
    <div className="w-screen h-screen bg-white/30 drop-shadow-2xl backdrop-blur-lg flex items-center justify-center absolute top-0 left-0 z-10" id="loginParent" onClick={activeHandler}>

      <div className="grid grid-cols-2 w-1/2 h-1/2" id="loginChild" onClick={activeHandler}>

        <div className="bg-background flex justify-center items-center text-4xl">LogIn</div>

        <div className="flex flex-col items-center justify-between bg-stroke">

          <div className=" h-full w-full flex justify-center items-center p-3">
            <input onChange={changeHandler} name="email" placeholder="email" className="bg-[#d9d9d9] p-7 text-black w-full text-2xl" />
          </div>
          <div className=" h-full w-full flex justify-center items-center p-3">
            <input onChange={changeHandler} name="password" placeholder="password" className="bg-[#d9d9d9] p-7 text-black w-full text-2xl" />
          </div>
          <div className=" h-full w-full flex justify-center items-center p-3">
            <div className="bg-[#d9d9d9] p-7 text-center text-gray-600 font-bold w-full text-3xl hover:cursor-pointer hover:bg-stroke hover:border border-white" onClick={clickHandler}>
              Submit
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
