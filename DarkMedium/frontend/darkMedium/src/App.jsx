import { useState } from 'react'
import './App.css'
import { Intro } from './pages/intro'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-[#282828] w-screen h-screen text-white m-0'>
      <Intro />
    </div>
  )
}

export default App
