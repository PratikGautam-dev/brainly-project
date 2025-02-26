import { Logo } from "../icons/Logo";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { InstagramIcon } from "../icons/InstagramIcon";
import { FilterType, useFilter } from "../context/FilterContext";
import { useNavigate } from "react-router-dom";
import { LogoutIcon } from "../icons/LogoutIcon";

export function Sidebar() {
    const { activeFilter, setActiveFilter } = useFilter();
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem("token");

    const handleFilterClick = (filter: FilterType) => {
        setActiveFilter(filter);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/dashboard";
    };

    return <div className="h-screen bg-gray-900/95 backdrop-blur-lg border-r border-gray-800 w-72 fixed left-0 top-0 pl-6 flex flex-col">
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
}