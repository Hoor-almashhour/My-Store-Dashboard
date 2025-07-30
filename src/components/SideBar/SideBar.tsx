
import { Link, useNavigate } from "react-router-dom"
import React, { useState } from "react";
import { RiLogoutCircleLine } from "react-icons/ri";
import { showSuccessToast } from "../ToastUtils/ToastUtils";


interface Items {
  content : string
  link : string
  icon: React.ReactNode

}


interface Props {
  logo :  React.ReactNode;
  items : Array <Items>
}

const SideBar = ({logo , items} : Props) => {

  const [showLogoutModal, setShowLogoutModal] = useState(false);

    const navigate = useNavigate( )
    async function logOut() {
      await fetch("https://vica.website/api/logout" , {
      method : "POST",
      headers : {
        "AUTHORIZATION" : `Bearer $(localStorage-getItem("token")}`,
        "Accept" : "application/json"
          }
        })
      .then (res => res. json())
      
      .then (res =>{ 
        console. log(res)
        localStorage. removeItem("token" )
        localStorage. removeItem ("userInfo")
        showSuccessToast(" You have been logged out successfully");
      })
      
      navigate("/")
    }
  return (
    <div className="w-[220px] py-6 text-center flex flex-col gap-9 min-h-screen dark:bg-dark ">
      <div className="logo">{logo}</div>
      <div className="items flex flex-col gap justify-between grow items-center pr-7">
        <ul className="grow flex flex-col gap-8 ">
          {
            items.map((item , index) =>{
              return(
          <li key={index}>
            <Link
                  to={item.link}
                  className="flex items-center gap-3 text-gray-700 dark:text-white hover:text-blue-500 transition"
                >
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm font-medium">{item.content}</span>
            </Link>
          </li>
              )
            })
          }
        </ul>
      </div >
        <button className="cursor-pointer flex items-center gap-2  w[160px] h-10 rounded-md bg-blue-500 text-white mr-9 ml-7" onClick ={() => setShowLogoutModal(true)}>
          <RiLogoutCircleLine className="ml-8 transform rotate-[90deg]" />
          Logout
        </button>
        {showLogoutModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center">
          <div className="dark:bg-[#1f2a3c] p-12 rounded-xl bg-white w-[450px]  shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-6 dark:text-white text-black">Do you want to logout?</h2>
            <div className="flex justify-center gap-6">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="cursor-pointer dark:bg-gray-100 bg-gray-300 text-black px-11 py-2 rounded-md "
              >
                No
              </button>
              <button
                  onClick={logOut}
                  className="dark:bg-red-600 text-white px-11 py-2 rounded-md bg-blue-500  cursor-pointer"
                >
                  Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SideBar
