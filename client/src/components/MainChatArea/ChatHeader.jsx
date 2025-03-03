import React from 'react';

export function ChatHeader() {
    return (
        <div className="p-4 bg-white border-b border-gray-200">
            <div className="flex items-center space-x-3">
                <img src="https://loremflickr.com/40/40/avatar" alt="Selected Client" className="w-8 h-8 rounded-full" />
                <div>
                    <h2 className="font-semibold text-gray-800">Group Chat</h2>
                    <p className="text-sm text-gray-500">3 participants</p>
                </div>
            </div>
        </div>
    );
}
