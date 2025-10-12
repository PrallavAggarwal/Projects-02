import { useNavigate } from 'react-router-dom'
import MonkeyThinks from '../assets/MonkeyThinks.jpeg'

export function Intro() {

  const navigate = useNavigate()
  function signUpHandler() {
    navigate('/signup')
  }
  function loginHandler() {
    navigate('/login')
  }

  return (
    <div className="m-auto w-[1200px] h-screen">
      <div className="flex flex-col gap-2 items-center justify-center pt-4">
        <div className=" text-6xl font-PlayFairDisplay">Dark</div>
        <div className=" text-3xl font-FiraMono">Articles to document your expresssions.</div>
      </div>
      <div className=" flex flex-col gap-6 mt-40 items-center w-full">
        <div className="w-3/6">
          <img src={MonkeyThinks} className="w-full" />
        </div>
        <div className="w-3/6 flex justify-between gap-2">
          <div className="border w-full text-4xl text-center p-3" onClick={signUpHandler}>SignUp</div>
          <div className="border w-full text-4xl text-center p-3" onClick={loginHandler}>LogIn</div>
        </div>
      </div>
    </div>

  )
}
