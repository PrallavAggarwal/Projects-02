import { useContext, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext";



export function SignUp() {

  const navigate = useNavigate()

  const { isLoggedIn, setLoggedIn } = useContext(AppContext);

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

  async function submitHandler() {
    try {
      let input = {
        email: emailRef.current,
        username: usernameRef.current,
        password: passwordRef.current
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
        console.log('isLoggedIn value before : ', isLoggedIn);
        setLoggedIn((prev) => !prev);
        console.log('isLoggedIn value after : ', isLoggedIn)
      }


    } catch (error) {
      console.log('error while signup : ', error)
    }
  }

  return (
    <div id="parent" className={`${active ? 'hidden' : ''} w-screen h-screen bg-white/30 drop-shadow-2xl backdrop-blur-lg flex items-center justify-center absolute top-0 left-0 z-10`} onClick={activeHandler}>
      <div onClick={activeHandler} id="child" className="grid grid-cols-2 w-1/2 h-1/2">
        <div className="bg-background flex justify-center items-center text-4xl">SignUp</div>
        <div className="flex flex-col items-center justify-between bg-stroke">
          <div className=" h-full w-full flex justify-center items-center p-3"><input name="email" type="email" onChange={changeHandler} placeholder="email" className="bg-[#d9d9d9] p-7 text-black w-full text-2xl" /></div>
          <div className=" h-full w-full flex justify-center items-center p-3"><input name="username" type="text" onChange={changeHandler} placeholder="username" className="bg-[#d9d9d9] p-7 text-black w-full text-2xl" /></div>
          <div className=" h-full w-full flex justify-center items-center p-3"><input name="password" type="password" onChange={changeHandler} placeholder="password" className="bg-[#d9d9d9] p-7 text-black w-full text-2xl" /></div>
          <div className=" h-full w-full flex justify-center items-center p-3"><div className="bg-[#d9d9d9] p-7 text-center text-gray-600 font-bold w-full text-3xl hover:cursor-pointer hover:bg-stroke hover:border border-white" onClick={submitHandler}>Submit</div></div>
        </div>
      </div>
    </div >
  )
} 
