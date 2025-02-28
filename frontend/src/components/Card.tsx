import { ShareIcon } from "../icons/ShareIcon";
import { LoadingSpinner } from "./LoadingSpinner";
import { useState, useEffect } from "react";
import { DeleteIcon } from "../icons/DeleteIcon";
import { deleteContent } from "../api/content";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { InstagramIcon } from "../icons/InstagramIcon";

interface CardProps {
    id?: string;
    _id?: string;
    title: string;
    link: string;
    type: "youtube" | "twitter" | "instagram";
    onDelete: () => Promise<void>;
}

export function Card({id, title, link, type, onDelete}: CardProps) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (type === 'twitter') {
            // Reduce loading time by setting a shorter timeout
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 500);

            if (!window.twttr) {
                const script = document.createElement('script');
                script.src = 'https://platform.twitter.com/widgets.js';
                script.async = true;
                document.head.appendChild(script);
            } else {
                window.twttr.widgets.load();
            }

            return () => clearTimeout(timer);
        }
    }, [type, link]);

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this content?")) {
            try {
                if (id) {
                    await deleteContent(id);
                    await onDelete();
                }
            } catch (error) {
                console.error("Delete failed:", error);
                alert("Failed to delete content");
            }
        }
    };

    const TypeIcon = {
        youtube: YoutubeIcon,
        twitter: TwitterIcon,
        instagram: InstagramIcon
    }[type];

    return (
        <div className="w-full">
            <div className="p-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-gray-800/70">
                <div className="flex justify-between">
                    <div className="flex items-center text-md text-gray-300">
                        <div className="text-gray-400 pr-2">
                            <TypeIcon />
                        </div>
                        {title}
                    </div>
                    <div className="flex items-center">
                        <div className="text-gray-400 cursor-pointer hover:text-red-500 transition-colors" onClick={handleDelete}>
                            <DeleteIcon />
                        </div>
                    </div>
                </div>

                <div className="pt-4 bg-gray-900/30 mt-4 rounded-lg p-4 overflow-hidden">
                    {type === "twitter" && (
                        <div className="w-full flex justify-center">
                            {isLoading && <LoadingSpinner />}
                            <div className={`max-w-[350px] mx-auto ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}>
                                <blockquote 
                                    className="twitter-tweet" 
                                    data-theme="dark"
                                    data-width="350"
                                    data-align="center"
                                >
                                    <a href={link.includes("x.com") ? link.replace("x.com", "twitter.com") : link}></a>
                                </blockquote>
                            </div>
                        </div>
                    )}

                    {type === "youtube" && (
                        <div className="aspect-video w-full max-w-[550px] mx-auto">
                            {isLoading && <LoadingSpinner />}
                            <iframe 
                                className={`w-full h-full ${isLoading ? 'hidden' : 'block'}`}
                                src={link.replace("watch?v=", "embed/")}
                                title="YouTube video player"
                                onLoad={() => setIsLoading(false)}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    )}

                    {type === "instagram" && (
                        <div className="min-h-[400px] w-full flex items-center justify-center">
                            {isLoading && <LoadingSpinner />}
                            <div className={`w-full max-w-[300px] mx-auto ${isLoading ? 'hidden' : 'block'}`}>
                                <iframe 
                                    className="w-full h-[400px]"
                                    src={`https://www.instagram.com/p/${link.split('/p/')[1]?.split('/')[0]}/embed/captioned`}
                                    title="Instagram post"
                                    onLoad={() => setIsLoading(false)}
                                    frameBorder="0"
                                    scrolling="no"
                                    allowTransparency={true}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}