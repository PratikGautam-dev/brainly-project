import { useEffect, useState } from "react";
import { Card } from "./Card";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useFilter } from "../context/FilterContext";
import { LoadingSpinner } from "./LoadingSpinner";

interface Content {
    _id: string;  // Changed from id to _id to match MongoDB
    title: string;
    link: string;
    type: "youtube" | "twitter" | "instagram";
}

export function Feed() {
    const [content, setContent] = useState<Content[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { activeFilter } = useFilter();

    const getContent = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            });
            setContent(response.data.content);
        } catch (error) {
            console.error("Error fetching content:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getContent();
    }, []);

    const filteredContent = activeFilter === "all" 
        ? content 
        : content.filter(item => item.type === activeFilter);

    return (
        <>
            {isLoading ? (
                <div className="col-span-full flex justify-center py-12">
                    <LoadingSpinner />
                </div>
            ) : filteredContent.length === 0 ? (
                <div className="col-span-full text-center py-12 bg-white rounded-lg shadow-sm">
                    <p className="text-gray-500">No content yet. Add some content to get started!</p>
                </div>
            ) : (
                filteredContent.map(content => (
                    <Card 
                        key={content._id}
                        id={content._id}
                        title={content.title}
                        link={content.link}
                        type={content.type}
                        onDelete={getContent}
                    />
                ))
            )}
        </>
    );
}
