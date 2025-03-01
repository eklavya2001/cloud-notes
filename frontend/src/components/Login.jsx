import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import CryptoJS from 'crypto-js';

function Login({ setIsAuthenticated }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const encryptedPassword = CryptoJS.AES.encrypt(password, "Ekchua@123").toString();

        try {
            const response = await api.post(
                "/api/auth/login",
                { email, password: encryptedPassword },
                { withCredentials: true }
            );

            if (response.status === 200) {
                alert("Successfully logged in");

                // Wait a bit to ensure cookies are set before checking authentication
                setTimeout(async () => {
                    try {
                        const authCheck = await api.get("/api/auth/check", { withCredentials: true });
                        console.log(authCheck.data.isAuthenticated);
                        setIsAuthenticated(authCheck.data.isAuthenticated);
                        navigate("/dashboard");
                    } catch (error) {
                        console.error("Auth check failed after login:", error);
                    }
                }, 500); // Delay of 500ms
            }
        } catch (error) {
            alert("Invalid credentials or unexpected error");
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 via-blue-500 to-yellow-400">
            <div className="bg-white p-10 rounded-2xl shadow-xl max-w-lg w-full relative z-10">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-500 to-red-500 opacity-20 rounded-2xl -z-10"></div>
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-7">Welcome Back to Cloud Notebook</h2>
                <p className="text-center text-lg text-gray-600 mb-8">
                    Securely store your notes, organize them, and access them from anywhere. Let your ideas flow seamlessly!
                </p>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Enter Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-4 bg-gray-100 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Enter Your Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-4 bg-gray-100 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <button type="submit" className="w-full py-3 bg-indigo-600 text-white rounded-lg text-lg font-semibold hover:bg-indigo-700 focus:outline-none">
                            Login
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <a href="/signup" className="text-indigo-600 hover:underline">
                            Sign up here
                        </a>
                    </p>
                </div>
            </div>

            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-500 to-teal-500 opacity-30 -z-10 rounded-2xl">hello</div>
        </div>
    );
}

export default Login
