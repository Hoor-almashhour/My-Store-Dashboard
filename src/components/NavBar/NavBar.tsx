import type React from "react";
import { IoIosSearch } from "react-icons/io";
import { IoSunnySharp } from "react-icons/io5";
import { IoMoon } from "react-icons/io5";


interface Props {

  setSearch : React.Dispatch<React.SetStateAction<string>>
  setMode : React.Dispatch<React.SetStateAction<boolean>>
  mode: boolean;
  
}

const NavBar = ({setSearch , setMode  , mode} : Props) => {

      const rawUserInfo = localStorage.getItem("userInfo");

      let userInfo = null;

      try {
        if (rawUserInfo) {
          userInfo = JSON.parse(rawUserInfo);
        }
      } catch (error) {
        console.error("Failed to parse userInfo from localStorage", error);
        userInfo = null;
      }

  return (
    <nav className="flex items-center justify-between  w-full dark:bg-dark">
        <div className="relative w-lg ml-4">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
          <IoIosSearch className="w-5 h-5" />
        </span>
        <input
          type="text"
          placeholder="Search a Product..."
          onChange={(event) => setSearch(event.target.value)}
          className="w-full  dark:bg-dark pl-10 pr-4 py-2 border border-gray-300 rounded-4xl focus:outline-none focus:ring-2 bg-gray-50 focus:ring-gray-500 dark:text-white"
        />
      </div>
      <div className="flex items-center gap-8">
          <div>
            <p className="font-semibold  text-black  dark:text-white">{userInfo?.first_name} {userInfo?.last_name}</p>
            <p className="text-xs text-gray-600  dark:text-white">{userInfo?.user_name}</p>
          </div>
          <span className="dark:text-white">|</span>
          <button onClick={()=>setMode(prev => !prev)  }
            className="text-2xl cursor-pointer p-4">
            <span className="sr-only">Search</span>
            {mode ? <IoSunnySharp className=" dark:text-white" /> :<IoMoon />} 
          </button>
      </div>
    </nav>
    
  )
}

export default NavBar
