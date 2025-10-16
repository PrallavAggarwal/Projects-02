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
    <div className='w-full h-full'>

      <div className="flex flex-col sm:w-[640px] items-center m-auto lg:w-[900px] h-full">
        <div className=" flex flex-col gap-2 items-center justify-center pt-4">
          <div className=" md:text-6xl text-3xl font-PlayFairDisplay">Dark</div>
          <div className=" md:text-3xl text-center font-FiraMono">Articles to document your expresssions.</div>
        </div>
        <div className=" flex flex-col gap-6 mt-40 items-center w-full">
          <div className="w-3/6">
            <img src={MonkeyThinks} className="w-full" />
          </div>
          <div className="font-FiraMono w-3/6 flex justify-between gap-2">
            <div className="border w-full md:text-3xl text-center md:p-3 hover:cursor-pointer hover:bg-stroke hover:inset-ring-2 hover:text-background transition-all ease-in-out" onClick={signUpHandler}>SignUp</div>
            <div className="border w-full md:text-3xl text-center md:p-3 hover:cursor-pointer hover:bg-stroke hover:inset-ring-2 hover:text-background transition-all ease-in-out" onClick={loginHandler}>LogIn</div>
          </div>
        </div>
      </div>


    </div>

  )
}
