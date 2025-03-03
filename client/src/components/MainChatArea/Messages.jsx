import React from 'react';

export function MessageReceived({ message, time, sender }) {
    return (
        <div className="flex items-end gap-2">
            <img src="https://loremflickr.com/32/32/avatar" alt="User" className="w-8 h-8 rounded-full shadow-md" />
            <div className="max-w-[70%] max-h-[50%]">
                <div className="bg-gray-100 p-3 rounded-2xl shadow-md">
                    <p className="text-gray-900 font-semibold">{sender}</p>
                    <p className="text-gray-800 mt-1">{message}</p>
                    <span className="text-xs text-gray-500 mt-2 block text-right">{time || "10:30 AM"}</span>
                </div>
            </div>
        </div>

    );
}
export function MessageSent({ message, time, sender }) {
    return (
        <div className="flex items-end gap-2 justify-end">
            <div className="max-w-[70%] min-w-[10%]">
                <div className="bg-blue-600 text-white p-3 rounded-2xl shadow-md relative">
                    <p className="text-gray-900 font-semibold">{sender}</p>
                    <p className="mt-1">{message}</p>
                    <span className="text-xs text-blue-200 mt-2 block text-right">{time || "10:31 AM"}</span>
                </div>
            </div>
            <img src="https://loremflickr.com/32/32/avatar" alt="You" className="w-8 h-8 rounded-full shadow-md" />
        </div>

    );
}
