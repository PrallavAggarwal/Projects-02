import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import { AppContext } from "../AppContext";


export function Sidebar() {

  const { setLoggedIn } = useContext(AppContext)

  async function signoutHandler() {
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

  const navigate = useNavigate();

  function profileHandler() {
    navigate('/profile')
  }
  function homeHandler() {
    navigate('/home')
  }

  return (
    <div className="font-FiraMono h-full  border-r border-stroke ">
      <div className="border-b-1 border-stroke pt-4 p-2 hover:inset-ring-2 hover:inset-ring-white" onClick={profileHandler}>Profile</div>
      <div className="border-b-1 border-stroke p-2 hover:inset-ring-2 hover:inset-ring-white" onClick={homeHandler}>Home</div>
      <div className="border-b-1 border-stroke p-2">Collection</div>
      <div className="border-b-1 border-stroke p-2 hover:inset-ring-2 hover:inset-ring-white" onClick={signoutHandler}>Sign Out</div>

    </div>
  )
}
