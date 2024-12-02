import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, onLogout }) => {
    return (
        <nav className="bg-indigo-600 p-4 shadow-md">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <h1 className="text-white text-2xl font-bold">Cloud Notebook</h1>
                <div>
                    {isAuthenticated ? (
                        <>
                            <Link to="/dashboard" className="text-white px-4 py-2">Dashboard</Link>
                            <button onClick={onLogout} className="text-white bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/" className="text-white px-4 py-2">Login</Link>
                            <Link to="/signup" className="text-white bg-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-800">Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
