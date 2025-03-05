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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden fixed top-4 right-4 z-50 p-2 rounded-lg bg-gray-800/50 text-gray-400 hover:text-white"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isMobileMenuOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-40 w-72 bg-gray-800/95 backdrop-blur-xl transform transition-transform duration-300 ease-in-out
                lg:translate-x-0 
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
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

            {/* Mobile Backdrop */}
            {isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </>
    );
}