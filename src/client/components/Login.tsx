//need login component
import React from "react";
import SubmitButton from "./SubmitButton.tsx";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate()

    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch("http://localhost:8080/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                navigate("/dashboard"); 
            } else {
                alert("Login failed. Please check your credentials.");
            }

        } catch (error) {
            console.error("LoginComponent Error", error)
        }
    };

    return (
        <form className='LoginForm' onSubmit={handleSubmit}>
            <label className='items-center input input-bordered flex items-center gap-2'>
                Email
                <input
                    type='text'
                    className='grow'
                    name='email'
                    value={loginData.email}
                    placeholder='Enter Your Email'
                    onChange={handleLoginChange}
                />
            </label>
            <label className='input input-bordered flex items-center gap-2'>
                Password
                <div className='relative'>
                <input
                    type={passwordVisible ? 'text' : 'password'}
                    className='grow'
                    name='password'
                    value={loginData.password}
                    placeholder='Enter your Password'
                    onChange={handleLoginChange}
                />
                <button
                        type="button"
                        className="absolute text-sm text-gray-600"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                    >
                        {passwordVisible ? "Hide" : "Show"} 
                    </button>
                </div>
            </label>
            <div className='text-center mt-4'>
                <SubmitButton label='Sign In' handleClick={handleSubmit} />
            </div>

        </form>
    );
};


export default LoginForm;