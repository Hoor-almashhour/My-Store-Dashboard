import { Outlet } from "react-router-dom"


const Auth = () => {
    return (
        <div className="relative flex justify-center items-center h-screen">
            <img src="/assets/Img/auth-bg.png" alt="bg" className="absolute top-[0] left-[0] z-[-1] h-screen w-screen" ></img>
            <Outlet />
        </div>
    )
}

export default Auth
