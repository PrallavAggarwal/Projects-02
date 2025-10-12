import { useContext, useState } from "react";
import { MainFrame } from "../components/mainFrame";
import { Header } from "../components/mainHeader";
import { Sidebar } from "../components/sidebar";
import { Tags } from "../components/tags";
import { Login } from "./login";
import { SignUp } from "./signup";
import { AppContext } from "../AppContext";
import { Profile } from "./profile";


export function ProfileHome() {

  const { isLoggedIn, user } = useContext(AppContext)
  console.log('inside home value of isLoggedIn : ', isLoggedIn)
  console.log('user in ProfileHome : ', user)


  return (
    <div className="w-screen h-screen overflow-hidden relative">
      {/* <Login /> */}
      {/* <SignUp /> */}


      {
        isLoggedIn &&
        <div className="z-0">
          <Header />
          <div className="grid md:grid-cols-[1fr_3fr_1fr] sm:grid-cols-[1fr_2fr] grid-cols-1 items-center justify-center h-[calc(100vh-57px)]">
            <Sidebar />
            <Profile />
            <Tags />
          </div>


        </div>

      }
      {
        !isLoggedIn &&
        <div className="z=0 flex items-center justify-center text-8xl">Please Log in.</div>
      }

    </div>

  )
}
