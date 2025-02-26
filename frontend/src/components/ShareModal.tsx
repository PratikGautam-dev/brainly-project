import { useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { CopyIcon } from "../icons/CopyIcon";

interface ShareModalProps {
    open: boolean;
    onClose: () => void;
}

export function ShareModal({ open, onClose }: ShareModalProps) {
    const [shareUrl, setShareUrl] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const generateShareLink = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {}, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            });
            const url = `${window.location.origin}/share/${response.data.hash}`;
            setShareUrl(url);
        } catch (error) {
            alert("Failed to generate share link");
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (error) {
            alert("Failed to copy to clipboard");
        }
    };

    if (!open) return null;

    return (
        <div className="relative z-[100]">
            <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <div className="bg-gray-800/90 border border-gray-700 rounded-xl shadow-2xl p-6 w-full max-w-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-200">Share Brain</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-300">
                            <CrossIcon />
                        </button>
                    </div>
                    {!shareUrl ? (
                        <Button 
                            onClick={generateShareLink} 
                            variant="primary" 
                            text={isLoading ? "Generating..." : "Generate Share Link"}
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg py-3 font-medium"
                        />
                    ) : (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 bg-gray-900/50 p-2 rounded-md">
                                <input 
                                    type="text" 
                                    value={shareUrl} 
                                    readOnly 
                                    className="bg-transparent flex-1 outline-none text-gray-300"
                                />
                                <button 
                                    onClick={copyToClipboard}
                                    className="text-gray-400 hover:text-purple-400 transition-colors"
                                >
                                    <CopyIcon />
                                </button>
                            </div>
                            {isCopied && (
                                <p className="text-green-500 text-sm text-center">Copied to clipboard!</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
