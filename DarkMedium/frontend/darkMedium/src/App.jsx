import { useContext, useState } from 'react'
import './App.css'
import { Intro } from './pages/intro'
import { Home } from './pages/home'
import { Route, Routes } from 'react-router-dom'
import { SignUp } from './pages/signup'
import { Login } from './pages/login'
import { CreateBlog } from './pages/createBlog'
import { AppContext } from './AppContext'
import { ProfileHome } from './pages/profileHome'
import { UploadImage } from './components/uploadImage'

function App() {


  return (
    <div className='bg-[#282828] w-screen h-screen text-white'>



      <Routes>
        <Route path='/uploadImage' element={<UploadImage />} />
        <Route path='/' element={<Intro />} />
        <Route path='/home' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/createBlog' element={<CreateBlog />} />
        <Route path='/profile' element={<ProfileHome />} />
      </Routes>

    </div>
  )
}

export default App
