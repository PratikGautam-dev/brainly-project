import axios from "axios";
import { BACKEND_URL } from "../config";

export const deleteContent = async (contentId: string) => {
    if (!contentId) {
        throw new Error('Content ID is missing');
    }

    try {
        console.log('Attempting to delete content:', contentId);
        console.log('Using backend URL:', BACKEND_URL);
        
        const response = await axios.delete(`${BACKEND_URL}/api/v1/content/${contentId}`, {
            headers: {
                "Authorization": localStorage.getItem("token"),
                "Content-Type": "application/json"
            },
            timeout: 5000  // 5 second timeout
        });
        
        console.log('Delete response:', response);
        return response.data;
    } catch (error: any) {
        console.error('Delete request details:', {
            url: `${BACKEND_URL}/api/v1/content/${contentId}`,
            token: localStorage.getItem("token") ? 'Present' : 'Missing',
            error: error.message
        });
        throw error;
    }
};
