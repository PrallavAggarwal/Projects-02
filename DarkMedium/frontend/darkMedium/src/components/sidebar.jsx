import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import { AppContext } from "../AppContext";
import { signoutHandler } from "../requests/apiRequests";
import { useMutation } from "@tanstack/react-query";

export function Sidebar() {

  const { isLoggedIn, setLoggedIn } = useContext(AppContext)
  const navigate = useNavigate();

  function profileHandler() {
    navigate('/profile')
  }
  function homeHandler() {
    navigate('/home')
  }



  const { mutate } = useMutation({
    mutationFn: () => signoutHandler(),
    onSuccess: () => {
      setLoggedIn(false);
      navigate('/')
    },
    onError: (error) => {
      console.log("error while signing out : ", error)
    }
  })

  function clickHandler() {
    mutate()
  }


  return (
    <div className="border-b-1 sm:border-b-0 font-FiraMono h-full flex sm:flex sm:flex-col justify-center sm:justify-start sm:border-r border-stroke ">
      <div className="border-r-1 border-l-1 sm:border-l-0 sm:border-r-0 sm:border-b-1 border-stroke sm:pt-4 p-2 hover:inset-ring-2 hover:inset-ring-white" onClick={profileHandler}>Profile</div>
      <div className="border-r-1 sm:border-r-0 sm:border-b-1 border-stroke p-2 hover:inset-ring-2 hover:inset-ring-white" onClick={homeHandler}>Home</div>
      <div className="border-r-1 sm:border-r-0 sm:border-b-1 border-stroke p-2">Collection</div>
      <div className="border-r-1 sm:border-r-0 sm:border-b-1 border-stroke p-2 hover:inset-ring-2 hover:inset-ring-white" onClick={clickHandler}>Sign Out</div>

    </div>
  )
}
