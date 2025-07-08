
import NavBar from "../components/NavBar/NavBar"
import SideBar from "../components/SideBar/SideBar"
import { createContext, useState } from "react"
import { AiOutlineProduct } from "react-icons/ai";
import { MdFavoriteBorder } from "react-icons/md";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { Outlet } from "react-router-dom";

export const SearchContext = createContext<string>("")


const Root = () => {
    const [search , setSearch] = useState<string>("")
    const [mode , setMode] = useState<boolean>(false)

    const logo = (
    <h1 className="text-3xl font-bold ">
        <span className="text-blue-500">Dash</span>
        <span className="text-black dark:text-white">Stack</span>
    </h1>
    )
    return (
        <div className={`${mode&&"dark"} flex min-h-screen`}>
            <SearchContext.Provider value={search}>
                <SideBar logo= {logo}
                                                items={[{content : "Products" , link :"/dashboard/items", icon: <AiOutlineProduct />}
                                                ,{content : "Favorites" , link :"/dashboard/favorites" , icon: <MdFavoriteBorder />}
                                                ,{content : "Order Lists" , link :"/dashboard/orders" , icon: <AiOutlineUnorderedList />}]}/>
                <div className="child grow flex-1 flex flex-col">
                    <NavBar setSearch = {setSearch} setMode = {setMode}  mode={mode}/>
                    <div className="p-6 bg-gray-100 dark:bg-gray-700 min-h-screen flex-1">
                        <Outlet/>
                    </div>
                </div>
            </SearchContext.Provider>
        </div>
    )
}

export default Root
