import { useState } from "react";
import AuthForm from "../components/AuthForm/AuthForm";
import { showSuccessToast, showErrorToast } from "../components/ToastUtils/ToastUtils";
import { useNavigate } from "react-router-dom";

    interface LogInData {
    email: string;
    password: string;
    }

    const Login = () => {
    const [data, setData] = useState<LogInData>({
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    const sendData = async () => {

        try {

        console.log("Sending Data:", data);
        const response = await fetch("https://vica.website/api/login", {
            method: "POST",
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log(result);

        if (result.token && result.user) {
            localStorage.setItem("token", result.token);
            localStorage.setItem("userInfo", JSON.stringify(result.user));
        }
            showSuccessToast("You have been logged in successfully");
            navigate("/dashboard");
        }
        catch (err) {
            console.error(err);
            showErrorToast("Something went wrong. Please try again.");
        }
    };

    const inputs = [
        {
        label: "Email address:",
        placeholder: "example@gmail.com",
        type: "email",
        name: "email"
        },
        {
        label: "Password:",
        placeholder: "******",
        type: "password",
        name: "password"
        }
    ];

    return (
        <>
        <AuthForm<LogInData>
            title="Login to Account"
            description="Please enter your email and password to continue"
            inputs={inputs}
            btn="Sign In"
            footer={{
            description: "Don’t have an account?",
            link: { content: "Create Account", url: "/signup" }
            }}
            setData={setData}
            data={data}
            onSubmit={sendData}
        />
        </>
    );
};

export default Login;

