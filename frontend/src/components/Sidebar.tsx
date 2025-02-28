import { Logo } from "../icons/Logo";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { InstagramIcon } from "../icons/InstagramIcon";
import { FilterType, useFilter } from "../context/FilterContext";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { LogoutIcon } from "../icons/LogoutIcon";
import { MenuIcon } from "../icons/MenuIcon";

export function Sidebar() {
    const { activeFilter, setActiveFilter } = useFilter();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const isAuthenticated = !!localStorage.getItem("token");

    const handleFilterClick = (filter: FilterType) => {
        setActiveFilter(filter);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
            >
                <MenuIcon className="w-6 h-6" />
            </button>

            {/* Sidebar */}
            <aside className={`
                fixed top-0 left-0 h-full w-72 bg-gray-800/50 backdrop-blur-xl border-r border-gray-700
                transform transition-transform duration-300 ease-in-out z-40
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="p-6">
                    <div className="flex text-2xl pt-8 items-center">
                        <div className="pr-2 text-purple-500">
                            <Logo />
                        </div>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                            Brainly
                        </span>
                    </div>
                    
                    <div className="pt-8 pl-4 flex-grow">
                        <div 
                            className={`flex items-center p-2 cursor-pointer rounded-md text-gray-300 ${activeFilter === "all" ? "bg-purple-600/20 text-purple-400" : "hover:bg-gray-800/50"}`}
                            onClick={() => handleFilterClick("all")}
                        >
                            All
                        </div>
                        <div 
                            className={`flex items-center p-2 cursor-pointer rounded-md text-gray-300 ${activeFilter === "twitter" ? "bg-purple-600/20 text-purple-400" : "hover:bg-gray-800/50"}`}
                            onClick={() => handleFilterClick("twitter")}
                        >
                            <span className="mr-2"><TwitterIcon /></span>
                            Twitter
                        </div>
                        <div 
                            className={`flex items-center p-2 cursor-pointer rounded-md text-gray-300 ${activeFilter === "youtube" ? "bg-purple-600/20 text-purple-400" : "hover:bg-gray-800/50"}`}
                            onClick={() => handleFilterClick("youtube")}
                        >
                            <span className="mr-2"><YoutubeIcon /></span>
                            Youtube
                        </div>
                        <div 
                            className={`flex items-center p-2 cursor-pointer rounded-md text-gray-300 ${activeFilter === "instagram" ? "bg-purple-600/20 text-purple-400" : "hover:bg-gray-800/50"}`}
                            onClick={() => handleFilterClick("instagram")}
                        >
                            <span className="mr-2"><InstagramIcon /></span>
                            Instagram
                        </div>
                    </div>

                    <div className="p-6 border-t border-gray-800">
                        {isAuthenticated ? (
                            <div 
                                className="flex items-center p-3 cursor-pointer text-red-400 hover:bg-red-950/30 rounded-md"
                                onClick={handleLogout}
                            >
                                <span className="mr-2"><LogoutIcon /></span>
                                <span className="font-medium">Logout</span>
                            </div>
                        ) : (
                            <button 
                                onClick={() => navigate("/signin")}
                                className="w-full flex items-center justify-center p-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-md transition-all duration-300"
                            >
                                <span className="font-medium">Sign in</span>
                            </button>
                        )}
                    </div>
                </div>
            </aside>

            {/* Overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 lg:hidden z-30"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}