import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import CryptoJS from 'crypto-js';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const encryptedPassword = CryptoJS.AES.encrypt(password, "Ekchua@123").toString();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await api.post('/api/auth/signup', { email, password: encryptedPassword }, { withCredentials: true });
            alert('Signup successful! Please login');
            navigate('/');
        } catch (error) {
            alert('Error during Signup. Try again!');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 via-blue-500 to-teal-400">
            <div className="bg-white p-10 rounded-2xl shadow-xl max-w-lg w-full relative z-10">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-500 to-teal-500 opacity-20 rounded-2xl -z-10"></div>
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Create Your Cloud Notebook Account</h2>
                <p className="text-center text-lg text-gray-600 mb-8">
                    Start your journey with Cloud Notebook! Securely store, organize, and access your notes from anywhere, anytime.
                </p>
                <form onSubmit={handleSignup} className="space-y-6">
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
                            Sign Up
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <a href="/" className="text-indigo-600 hover:underline">
                            Login here
                        </a>
                    </p>
                </div>
            </div>

            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-500 to-teal-500 opacity-30 -z-10 rounded-2xl"></div>
        </div>
    );
}

export default Signup;
