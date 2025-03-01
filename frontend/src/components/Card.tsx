import { ShareIcon } from "../icons/ShareIcon";
import { LoadingSpinner } from "./LoadingSpinner";
import { useState, useEffect } from "react";
import { DeleteIcon } from "../icons/DeleteIcon";
import { deleteContent } from "../api/content";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { InstagramIcon } from "../icons/InstagramIcon";

interface CardProps {
    _id: string;            // Use _id consistently instead of id
    title: string;
    description?: string;   // Make description optional
    url?: string;          // Make url optional
    link?: string;         // Add support for link prop
    type: "youtube" | "twitter" | "instagram";
    onDelete: () => Promise<void>;
}

export function Card({ _id, title, description, url, link, type, onDelete }: CardProps) {
    const [isLoading, setIsLoading] = useState(true);
    const contentUrl = url || link || '';  // Provide default empty string

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
                await deleteContent(_id);  // Use _id instead of id
                await onDelete();
            } catch (error) {
                console.error("Delete failed:", error);
                alert("Failed to delete content");
            }
        }
    };

    const getEmbedUrl = () => {
        if (!contentUrl) return '';
        
        switch (type) {
            case 'youtube':
                return contentUrl.replace("watch?v=", "embed/");
            case 'twitter':
                return contentUrl.includes("x.com") ? 
                    contentUrl.replace("x.com", "twitter.com") : 
                    contentUrl;
            case 'instagram':
                const postId = contentUrl.split('/p/')[1]?.split('/')[0];
                return postId ? 
                    `https://www.instagram.com/p/${postId}/embed/captioned` : 
                    '';
            default:
                return contentUrl;
        }
    };

    const TypeIcon = {
        youtube: YoutubeIcon,
        twitter: TwitterIcon,
        instagram: InstagramIcon
    }[type];

    return (
        <div className="w-full">
            <div className="p-3 sm:p-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-gray-800/70">
                <div className="flex justify-between items-start">
                    <div className="flex items-start text-sm sm:text-md text-gray-300 gap-2">
                        <div className="text-gray-400 shrink-0">
                            <TypeIcon />
                        </div>
                        <span className="line-clamp-2">{title}</span>
                    </div>
                    <div className="flex items-center ml-2">
                        <div className="text-gray-400 cursor-pointer hover:text-red-500 transition-colors" onClick={handleDelete}>
                            <DeleteIcon />
                        </div>
                    </div>
                </div>

                <div className="pt-3 sm:pt-4 bg-gray-900/30 mt-3 sm:mt-4 rounded-lg p-3 sm:p-4 overflow-hidden">
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
                                    <a href={getEmbedUrl()}></a>
                                </blockquote>
                            </div>
                        </div>
                    )}

                    {type === "youtube" && (
                        <div className="aspect-video w-full max-w-[550px] mx-auto">
                            {isLoading && <LoadingSpinner />}
                            <iframe 
                                className={`w-full h-full ${isLoading ? 'hidden' : 'block'}`}
                                src={getEmbedUrl()}
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
                                    src={getEmbedUrl()}
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