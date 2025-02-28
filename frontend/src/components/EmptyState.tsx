import { PlusIcon } from "../icons/PlusIcon";

export function EmptyState({ onClick }: { onClick: () => void }) {
    return (
        <div className="text-center py-16 px-4">
            <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 max-w-md mx-auto">
                <div className="mx-auto w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mb-4">
                    <PlusIcon className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium text-gray-200 mb-2">No content yet</h3>
                <p className="text-gray-400 mb-6">Start by adding your favorite YouTube videos, tweets, or Instagram posts.</p>
                <button
                    onClick={onClick}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
                >
                    Add Your First Content
                </button>
            </div>
        </div>
    );
}
