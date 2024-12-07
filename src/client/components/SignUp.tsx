import React, { useState, useEffect } from "react";
import SubmitButton from "./SubmitButton.tsx";

interface SignUpFormProps {
    closeModal: () => void;
}
const SignUpForm: React.FC<SignUpFormProps> = ({ closeModal }) => {
    const [signUpData, setSignUpData] = useState({
        email: "",
        password: ""
    })
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignUpData({
            ...signUpData,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        //INSERT URL FOR LOGIN ENDPOINT 
        try {
            const response = await fetch("ENTER URL", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(signUpData),
            })

        } catch (error) {
            console.error("LoginComponent Error", error)
        }
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            closeModal()
        }
    }


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50"
            onClick={handleOverlayClick}
        >
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                    onClick={closeModal}  // Close modal when clicking on the close button
                >
                    &times;
                </button>
                <form className="SignUpForm" onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-semibold text-center mb-6">NxtMove</h2>

                    <label className="block mb-4">
                        <span className="block text-sm font-medium text-gray-700">Email</span>
                        <input
                            type="text"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="email"
                            value={signUpData.email}
                            placeholder="Enter Your Email"
                            onChange={handleLoginChange}
                        />
                    </label>

                    <label className="block mb-4">
                        <span className="block text-sm font-medium text-gray-700">Password</span>
                        <div className="relative">
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                name="password"
                                value={signUpData.password}
                                placeholder="Enter Your Password"
                                onChange={handleLoginChange}
                            />
                            <button
                                type="button"
                                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-sm text-gray-600"
                                onClick={() => setPasswordVisible(!passwordVisible)}
                            >
                                {passwordVisible ? 'Hide' : 'Show'}
                            </button>
                        </div>
                    </label>

                    <div className="text-center mt-4">
                        <SubmitButton className='w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200' label='Sign Up' handleClick={handleSubmit} />
                    </div>
                </form>
            </div>
        </div>
    );



}

export default SignUpForm;