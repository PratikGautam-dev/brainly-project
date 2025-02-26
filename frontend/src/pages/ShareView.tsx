import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card } from "../components/Card";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { Logo } from "../icons/Logo";  // Fix import path
import axios from "axios";
import { BACKEND_URL } from "../config";

interface SharedContent {
    _id: string;
    title: string;
    link: string;
    type: "youtube" | "twitter" | "instagram";
}

export function ShareView() {
    const [content, setContent] = useState<SharedContent[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { hash } = useParams();

    useEffect(() => {
        async function getSharedContent() {
            try {
                setIsLoading(true);
                const response = await axios.get(`${BACKEND_URL}/api/v1/brain/${hash}`);
                setContent(response.data.content);
            } catch (error) {
                console.error("Error fetching shared content:", error);
            } finally {
                setIsLoading(false);
            }
        }
        getSharedContent();
    }, [hash]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <header className="bg-gray-800/50 backdrop-blur-lg border-b border-gray-700 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
                    <div className="flex items-center">
                        <Logo />
                        <h1 className="ml-3 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                            Shared Brain
                        </h1>
                    </div>
                    <Link 
                        to="/signin" 
                        className="text-purple-400 hover:text-purple-300 transition-colors"
                    >
                        Sign in to create your own
                    </Link>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <LoadingSpinner />
                    </div>
                ) : content.length === 0 ? (
                    <div className="text-center py-12 bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl">
                        <p className="text-gray-400">No content to display</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {content.map(item => (
                            <Card 
                                key={item._id}
                                {...item}
                                onDelete={async () => {}}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
