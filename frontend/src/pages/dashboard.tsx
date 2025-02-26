import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button"
import { CreateContentModal } from "../components/CreateContentModal"
import { PlusIcon } from "../icons/PlusIcon"
import { ShareIcon } from "../icons/ShareIcon"
import { YoutubeIcon } from "../icons/YoutubeIcon"
import { TwitterIcon } from "../icons/TwitterIcon"
import { InstagramIcon } from "../icons/InstagramIcon"
import { Sidebar } from "../components/Sidebar"
import { Feed } from "../components/Feed"
import { BACKEND_URL } from "../config"
import axios from "axios"
import { ShareModal } from "../components/ShareModal"

export function Dashboard() {
    const [modalOpen, setModalOpen] = useState(false);
    const [shareModalOpen, setShareModalOpen] = useState(false);
    const navigate = useNavigate();
    const [refreshKey, setRefreshKey] = useState(0);
    const isAuthenticated = !!localStorage.getItem("token");

    const handleContentAdded = () => {
        setRefreshKey(prev => prev + 1);
    };

    const handleAddContent = () => {
        if (!localStorage.getItem("token")) {
            navigate("/signin");
            return;
        }
        setModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <Sidebar />
            <div className="pl-72 min-h-screen">
                <header className="bg-gray-800/50 backdrop-blur-lg border-b border-gray-700 shadow-lg sticky top-0 z-10">
                    <div className="px-6 py-4 flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                            {isAuthenticated ? "Your Brain" : "Welcome to Brainly"}
                        </h1>
                        <div className="flex space-x-4">
                            <Button 
                                onClick={handleAddContent}
                                variant="primary" 
                                text={isAuthenticated ? "Add content" : "Sign in to add content"}
                                startIcon={<PlusIcon />}
                            />
                            {isAuthenticated && (
                                <Button 
                                    onClick={() => setShareModalOpen(true)} 
                                    variant="secondary" 
                                    text="Share brain" 
                                    startIcon={<ShareIcon />}
                                />
                            )}
                        </div>
                    </div>
                </header>

                <main className="p-6">
                    {isAuthenticated ? (
                        <>
                            <CreateContentModal 
                                open={modalOpen} 
                                onClose={() => setModalOpen(false)}
                                onContentAdded={handleContentAdded}
                            />
                            <ShareModal 
                                open={shareModalOpen}
                                onClose={() => setShareModalOpen(false)}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                <Feed key={refreshKey} />
                            </div>
                        </>
                    ) : (
                        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl shadow-2xl p-12 text-center min-h-[calc(100vh-160px)] flex items-center justify-center">
                            <div className="max-w-3xl mx-auto">
                                <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-6">
                                    Welcome to Your Second Brain
                                </h2>
                                <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                                    The ultimate platform to organize and share your favorite content from across the web. 
                                    Keep all your important content in one place.
                                </p>
                                <div className="grid grid-cols-3 gap-8 mb-12">
                                    <div className="p-8 bg-gray-800/50 rounded-xl border border-gray-700 transition-all duration-300 hover:scale-105 hover:bg-gray-800/70 hover:shadow-xl group">
                                        <YoutubeIcon className="w-16 h-16 text-red-500 mx-auto mb-4 transform group-hover:scale-110 transition-transform" />
                                        <h3 className="text-lg font-semibold mb-2 text-white">YouTube Videos</h3>
                                        <p className="text-gray-400">Save and organize your favorite videos</p>
                                    </div>
                                    <div className="p-8 bg-gray-800/50 rounded-xl border border-gray-700 transition-all duration-300 hover:scale-105 hover:bg-gray-800/70 hover:shadow-xl group">
                                        <TwitterIcon className="w-16 h-16 text-blue-400 mx-auto mb-4 transform group-hover:scale-110 transition-transform" />
                                        <h3 className="text-lg font-semibold mb-2 text-white">Twitter Posts</h3>
                                        <p className="text-gray-400">Keep track of important tweets</p>
                                    </div>
                                    <div className="p-8 bg-gray-800/50 rounded-xl border border-gray-700 transition-all duration-300 hover:scale-105 hover:bg-gray-800/70 hover:shadow-xl group">
                                        <InstagramIcon className="w-16 h-16 text-pink-500 mx-auto mb-4 transform group-hover:scale-110 transition-transform" />
                                        <h3 className="text-lg font-semibold mb-2 text-white">Instagram Posts</h3>
                                        <p className="text-gray-400">Save your favorite Instagram content</p>
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <Button 
                                        onClick={() => navigate("/signin")}
                                        variant="primary" 
                                        text="Get Started Today"
                                        className="text-lg px-16 py-5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 font-medium"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

