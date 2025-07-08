import { useEffect, useState } from "react"
import AuthForm from "../components/AuthForm/AuthForm"
import { showSuccessToast } from "../components/ToastUtils/ToastUtils";
import { useNavigate } from "react-router-dom";

interface LogInData {
        email : string;
        password : string;
    }

const Login = () => {
    const [data , setData] = useState<LogInData>({
        email : "" ,
        password : ""
    }) 
    useEffect(()=>{
        if (data.email != ''){
            sendData()
        }
    }, [data])
    const navigate = useNavigate()

    async function sendData() {
        await fetch("https://vica.website/api/login" , {
            method : "POST" ,
            headers : {
                "Accept" : "application/json" ,
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => {console.log(res)
                localStorage.setItem("token", res.token)
                localStorage.setItem("userInfo", JSON.stringify(res.user))
                showSuccessToast(" You have been logged in successfully")
        })
        .catch(err => console.log(err))
            if (localStorage.getItem("token")){
                navigate("/dashboard")
            }
    }
    const inputs  = [
        {
            label : "Email address:" ,
            placeholder: "example@gmail.com",
            type : "email",
            name : "email",
        },
        {   label : "Password:" ,
            placeholder: "******",
            type : "password",
            name : "password",
        }
    ]
    return (
        <>
        <AuthForm<LogInData> title="Login to Account" description="Please enter your email and password to continue" inputs={inputs} btn="Sign In" footer={{ description : "Don’t have an account?" , link : {content : "Create Account" , url : "/signup"} }} setData = {setData}  />
        </>
    )
}

export default Login
