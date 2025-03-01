import { useRef, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthLayout } from "../components/AuthLayout";

export function Signin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
                username,
                password
            });
            const jwt = response.data.token;
            localStorage.setItem("token", jwt);
            navigate("/dashboard");
        } catch (error: any) {
            console.error("Signin error:", error);
            if (error.code === "ERR_NETWORK") {
                setError("Cannot connect to server. Please try again later.");
            } else {
                setError(error.response?.data?.message || "Invalid username or password");
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <AuthLayout 
            title="Welcome Back!" 
            subtitle="Sign in to access your brain"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-900/50 text-gray-100 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-900/50 text-gray-100 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                    />
                </div>
                
                {error && (
                    <p className="text-red-400 text-sm text-center">{error}</p>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2 px-4 rounded-md transition-all duration-300 disabled:opacity-50"
                >
                    {isLoading ? "Signing in..." : "Sign In"}
                </button>
                <p className="text-center text-sm text-gray-400">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-purple-400 hover:text-purple-300">
                        Sign up
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
}