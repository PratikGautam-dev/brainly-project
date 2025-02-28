import { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';

interface CardProps {
    _id: string;
    title: string;
    description: string;
    url: string;
    type: string;
    onDelete: () => void;
}

export function Card({ _id, title, description, url, type, onDelete }: CardProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this item?')) {
            return;
        }

        setIsDeleting(true);
        try {
            await axios.delete(`${BACKEND_URL}/api/v1/content/${_id}`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            onDelete();
        } catch (error) {
            console.error('Error deleting content:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 hover:bg-gray-800/70 transition-all">
            <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
            <p className="text-gray-400 mb-4">{description}</p>
            <div className="flex justify-between items-center">
                <a 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300"
                >
                    Visit {type}
                </a>
                <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="text-red-400 hover:text-red-300 disabled:opacity-50"
                >
                    {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
            </div>
        </div>
    );
}