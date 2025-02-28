import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { BACKEND_URL } from "../config";
import axios from "axios";

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter",
    Instagram = "instagram"
}

interface CreateContentModalProps {
    open: boolean;
    onClose: () => void;
    onContentAdded?: () => void;  // Add this prop
}

// controlled component
export function CreateContentModal({open, onClose, onContentAdded}: CreateContentModalProps) {
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState(ContentType.Youtube);

    async function addContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        try {
            await axios.post(`${BACKEND_URL}/api/v1/content`, {
                link,
                title,
                type
            }, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            });
            
            onContentAdded?.();  // Call the refresh callback
            onClose();
        } catch (error) {
            console.error("Error adding content:", error);
            alert("Failed to add content");
        }
    }

    return <div className="relative z-[100]">
        {open && <div> 
            <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <div className="bg-gray-800/90 border border-gray-700 rounded-xl shadow-2xl p-6 w-full max-w-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-200">Add Content</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-300">
                            <CrossIcon />
                        </button>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                            <input
                                ref={titleRef}
                                className="w-full px-3 py-2 bg-gray-900/50 text-gray-100 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Title"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Link</label>
                            <input
                                ref={linkRef}
                                className="w-full px-3 py-2 bg-gray-900/50 text-gray-100 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Link"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
                            <div className="flex gap-2">
                                {Object.values(ContentType).map(contentType => (
                                    <button
                                        key={contentType}
                                        onClick={() => setType(contentType)}
                                        className={`px-4 py-2 rounded-md flex-1 transition-colors ${
                                            type === contentType 
                                            ? 'bg-purple-600 text-white' 
                                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                        }`}
                                    >
                                        {contentType}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <button
                            onClick={addContent}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-md hover:from-purple-700 hover:to-pink-700 transition-all duration-300 text-lg font-medium transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Add Content
                        </button>
                    </div>
                </div>
            </div>
        </div>}
    </div>
}
