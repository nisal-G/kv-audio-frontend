import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { AiFillAccountBook } from "react-icons/ai";

function App() {
  return (
    <>
      <div className= 'w-full h-screen flex'>

        <div className="bg-green-100 w-[300px] h-full ">
        </div>

        <div className="bg-blue-100 flex-1 h-full">
          <AiFillAccountBook />
        </div>

      </div>
    </>
  ) 
}

export default App
