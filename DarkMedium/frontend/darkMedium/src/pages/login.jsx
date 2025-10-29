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
        token: data.token,
        avatarUrl: data.user.avatarUrl
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
    <div className="w-screen h-screen bg-background drop-shadow-2xl backdrop-blur-lg flex items-center justify-center absolute top-0 left-0 z-10" id="loginParent" onClick={activeHandler}>

      <div className="font-FiraMono flex flex-col lg:grid lg:grid-cols-[1fr_2fr] w-1/2 h-1/2" id="loginChild" onClick={activeHandler}>

        <div className="bg-background flex justify-center items-center text-2xl md:text-4xl border-b-2 pb-2 lg:border-2 m-1.5">log_in</div>

        <div className="flex flex-col border-2 m-1.5 items-center justify-between bg-stroke">

          <div className="p-5 drop-shadow-2xl h-full w-full flex justify-center items-center">
            <input onChange={changeHandler} name="email" placeholder="email" className="bg-[#d9d9d9] p-5 text-black w-full h-full text-2xl" />
          </div>
          <div className="p-5 drop-shadow-2xl  h-full w-full flex justify-center items-center ">
            <input onChange={changeHandler} name="password" placeholder="password" className="bg-[#d9d9d9] p-5 text-black w-full h-full text-2xl" />
          </div>
          <div className=" drop-shadow-2xl p-5 h-full w-full flex justify-center items-center">
            <div className="bg-[#d9d9d9] p-5 flex justify-center items-center text-gray-600 font-bold w-full h-full text-2xl md:text-3xl hover:cursor-pointer hover:bg-stroke hover:inset-ring-2 hover:text-white transition-all ease-in-out  border-white" onClick={clickHandler}>
              Submit
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
