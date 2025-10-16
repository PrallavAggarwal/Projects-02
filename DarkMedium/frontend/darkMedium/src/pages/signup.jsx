import { useContext, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext";
import { signupHandler } from "../requests/apiRequests";
import { useMutation } from "@tanstack/react-query";


export function SignUp() {

  const navigate = useNavigate()

  const { user, setUser, isLoggedIn, setLoggedIn } = useContext(AppContext);

  const [active, setActive] = useState(false);
  function activeHandler(event) {
    if (event.target.id == 'parent') {
      setActive((prev) => !prev)
      navigate('/')
    }

  }

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: ""
  })

  const emailRef = useRef('');
  const usernameRef = useRef('');
  const passwordRef = useRef('');

  function changeHandler(event) {
    console.log(event.target.name);
    console.log(event.target.value);
    if (event.target.name == 'email') {
      emailRef.current = event.target.value;
    }
    if (event.target.name == 'username') {
      usernameRef.current = event.target.value;
    }
    if (event.target.name == 'password') {
      passwordRef.current = event.target.value;
    }
    console.log(passwordRef.current)

  }

  const { mutate } = useMutation({
    mutationFn: (input_data) => signupHandler(input_data),
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
      alert('signup success')
    },
    onError: (error) => {
      console.log("error while signup : ", error)
    }
  })

  function submitHandler() {
    let input_data = {
      email: emailRef.current,
      username: usernameRef.current,
      password: passwordRef.current
    }
    mutate(input_data);
  }


  return (
    <div id="parent" className={`${active ? 'hidden' : ''} w-screen h-screen bg-background drop-shadow-2xl backdrop-blur-lg flex items-center justify-center absolute top-0 left-0 z-10 font-FiraMono`} onClick={activeHandler}>
      <div onClick={activeHandler} id="child" className="font-FiraMono flex flex-col lg:grid lg:grid-cols-[1fr_2fr] w-1/2 h-1/2">
        <div className="bg-background flex justify-center items-center text-2xl md:text-4xl border-b-2 pb-2 lg:border-2 m-1.5">SignUp</div>
        <div className="flex flex-col items-center justify-between bg-stroke border-2 m-1.5">
          <div className=" h-full w-full flex justify-center items-center drop-shadow-2xl p-3"><input name="email" type="email" onChange={changeHandler} placeholder="email" className="bg-[#d9d9d9] p-7 text-black w-full text-2xl" /></div>
          <div className=" h-full w-full flex justify-center items-center p-3 drop-shadow-2xl "><input name="username" type="text" onChange={changeHandler} placeholder="username" className="bg-[#d9d9d9] p-7 text-black w-full text-2xl" /></div>
          <div className=" h-full w-full flex justify-center items-center p-3 drop-shadow-2xl "><input name="password" type="password" onChange={changeHandler} placeholder="password" className="bg-[#d9d9d9] p-7 text-black w-full text-2xl" /></div>
          <div className=" h-full w-full flex justify-center items-center p-3 drop-shadow-2xl "><div className="bg-[#d9d9d9] p-7 text-center text-gray-600 font-bold w-full text-2xl md:text-3xl hover:cursor-pointer hover:bg-stroke hover:inset-ring-2 hover:text-white transition-all ease-in-out  border-white" onClick={submitHandler}>Submit</div></div>
        </div>
      </div>
    </div >
  )
} 
