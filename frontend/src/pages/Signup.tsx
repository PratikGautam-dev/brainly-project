import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";  // Add missing axios import
import { BACKEND_URL } from "../config";  // Add missing BACKEND_URL import
import { AuthLayout } from "../components/AuthLayout";  // Add missing AuthLayout import
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Logo } from "../icons/Logo";

export function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            await axios.post(`${BACKEND_URL}/api/v1/signup`, {
                username,
                password
            });
            navigate("/signin");
        } catch (error: any) {
            setError(error.response?.data?.message || "Error creating account");
        }
    }

    return (
        <AuthLayout 
            title="Create Your Account" 
            subtitle="Join us to organize your content"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                        Username
                    </label>
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-900/50 text-gray-100 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                        minLength={3}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-900/50 text-gray-100 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                        minLength={6}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-900/50 text-gray-100 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                    />
                </div>
                
                {error && (
                    <p className="text-red-400 text-sm text-center">{error}</p>
                )}

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2 px-4 rounded-md transition-all duration-300"
                >
                    Sign Up
                </button>

                <p className="text-center text-sm text-gray-400">
                    Already have an account?{" "}
                    <Link to="/signin" className="text-purple-400 hover:text-purple-300">
                        Sign in
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
}