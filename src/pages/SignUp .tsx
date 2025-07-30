import { useState } from "react";
import AuthForm from "../components/AuthForm/AuthForm"
import { showErrorToast, showSuccessToast } from "../components/ToastUtils/ToastUtils";
import { useNavigate } from "react-router-dom";


interface SignUpData {
    first_name : string;
    last_name: string;
    user_name : string;
    email : string;
    password : string;
    password_confirmation : string;
    profile_image : Blob | null;

}

const SignUp  = () => {
    const [data , setData] = useState<SignUpData>({
            first_name : "",
            last_name: "",
            user_name : "",
            email : "",
            password : "",
            password_confirmation : "",
            profile_image : null
            
        }) 
        
    const navigate = useNavigate()

    const handleSubmit = async () => {

            const formData = new FormData()
            formData.append("first_name" , data.first_name)
            formData.append("last_name" , data.last_name)
            formData.append("user_name" , data.user_name)
            formData.append("email", data.email)
            formData.append("password", data.password)
            formData.append("password_confirmation", data.password_confirmation)
            if (data.profile_image) {
                formData.append("profile_image", data.profile_image);
            }
        try {
                const response = await fetch("https://vica.website/api/register", {
                    method: "POST",
                    headers: {
                    Accept: "application/json"
                    },
                    body: formData
                });

                const res = await response.json();
                console.log(res);

                if (!response.ok) {
                    const errorMessage = res.message || "Registration failed";
                    showErrorToast(errorMessage);
                    return;
                }

                if (res.token && res.user) {
                    localStorage.setItem("token", res.token);
                    localStorage.setItem("userInfo", JSON.stringify(res.user));
                    showSuccessToast(" created your account successfully")
                
                } 
                        navigate("/dashboard");
                }
                catch (err) {
                    console.error(err);
                    showErrorToast("Registration failed !,error")
                }
            };

    const inputs  = [
        {
            id: "first_name",
            label : "First Name:" ,
            placeholder: "First Name",
            type : "text",
            name : "first_name",
            group : "name"
        },
        {
            id: "last_name",
            label : "Last Name:" ,
            placeholder: "Last Name",
            type : "text",
            name : "last_name",
            group : "name"
        },
        {
            id: "user_name",
            label : "User Name:" ,
            placeholder: "User Name",
            type : "text",
            name : "user_name",
            group : "name"
        },
        {
            id: "email",
            label : "Email address:" ,
            placeholder: "example@gmail.com",
            type : "email",
            name : "email",
        },
        { 
            id: "password",
            label : "Password:" ,
            placeholder: "******",
            type : "password",
            name : "password",
            group : "passwords"
        },
        {  
            id: "password_confirmation",
            label : "Confirmation Password:" ,
            placeholder: "******",
            type : "password",
            name : "password_confirmation",
            group : "passwords"
        },
        {  
            id: "profile_image",
            label : "/assets/Img/profile_avatar.png" ,
            type : "file",
            name : "profile_image",
        }
    ]
    return (
        <>
            <div className=" max-w-[100%] flex justify-center items-center  rounded-4xl ">
                <AuthForm<SignUpData> 
                    title="Create an Account"
                    description="Create a account to continue"
                    inputs= {inputs} btn="Sign Up" 
                    footer={{ 
                    description : "Already have an account?" , 
                    link : {content : "Login" , url : "/"} }} 
                    setData = {setData} 
                    data={data}
                    onSubmit={handleSubmit}
                />
            </div>
        </>
    )
}

export default SignUp 
